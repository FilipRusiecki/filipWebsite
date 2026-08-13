import { useEffect, useMemo, useState } from 'react'
import { useQuery, useMutation } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'

const STORAGE_KEY = 'frvg-admin-pricing-calculator-v3'

const CLIENT_PROJECT_QUERY = gql`
  query AdminClientProjectQuery($id: Int!) {
    clientProject(id: $id) {
      id
      clientName
      projectName
      notes
      status
      paymentStatus
      receiptCode
      paidAt
      paidAmount
      nextChargeDate
      domainRenewalDate
      calcJson
      oneTimeTotal
      monthlyTotal
      firstYearTotal
      features {
        id
        name
        hours
        rate
        amount
        done
      }
    }
  }
`

const CREATE_CLIENT_PROJECT = gql`
  mutation CreateClientProjectMutation($input: CreateClientProjectInput!) {
    createClientProject(input: $input) {
      id
      clientName
      projectName
      status
      paymentStatus
      receiptCode
    }
  }
`

const UPDATE_CLIENT_PROJECT = gql`
  mutation UpdateClientProjectMutation($input: UpdateClientProjectInput!) {
    updateClientProject(input: $input) {
      id
      clientName
      projectName
      status
      paymentStatus
      receiptCode
    }
  }
`

const MARK_PAID_IN_FULL = gql`
  mutation MarkClientProjectPaidInFullMutation($id: Int!, $amount: Float) {
    markClientProjectPaidInFull(id: $id, amount: $amount) {
      id
      paymentStatus
      receiptCode
      paidAt
      paidAmount
      status
    }
  }
`

const CLEAR_PAID = gql`
  mutation ClearClientProjectPaidMutation($id: Int!) {
    clearClientProjectPaid(id: $id) {
      id
      paymentStatus
      receiptCode
      paidAt
      paidAmount
    }
  }
`

const euro = (n) =>
  `€${Number(n || 0).toLocaleString('en-IE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`

/** Show money, or make €0 clearly complimentary on quotes */
const moneyOrFree = (n) => {
  const v = Number(n) || 0
  if (v === 0) return 'Included — no charge'
  return euro(v)
}

const graphQlErrorText = (e, fallback) => {
  const gqlMsg = e?.graphQLErrors?.[0]?.message
  const netMsg =
    e?.networkError?.result?.errors?.[0]?.message || e?.networkError?.message
  return gqlMsg || netMsg || e?.message || fallback
}

const defaultState = {
  setup: true,
  setupPrice: 150,
  hosting: true,
  hostingPrice: 450,
  foundation: true,
  foundationPrice: 300,
  domain: false,
  domainYear1: 2,
  domainRenewal: 30,
  expertiseMode: 'percent', // percent | flat
  expertisePercent: 18,
  expertiseFlat: 200,
  discountEnabled: false,
  discountMode: 'flat', // flat | percent
  discountFlat: 100,
  discountPercent: 10,
  hourlyRate: 50,
  maintenanceEnabled: true,
  maintenanceHours: 2,
  toolsEnabled: true,
  toolsMonthly: 30,
  maintenanceMonths: 12,
  features: [
    { id: '1', name: 'Contact / enquiry form', hours: 3, rate: 50 },
  ],
  quoteClient: '',
  quoteProject: '',
  quoteDate: '',
  quoteNotes: '',
}

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultState, quoteDate: new Date().toISOString().slice(0, 10) }
    return {
      ...defaultState,
      ...JSON.parse(raw),
      quoteDate:
        JSON.parse(raw).quoteDate || new Date().toISOString().slice(0, 10),
    }
  } catch {
    return { ...defaultState, quoteDate: new Date().toISOString().slice(0, 10) }
  }
}

const AdminPricingCalculator = ({ loadProjectId = null, onProjectLoaded }) => {
  const [state, setState] = useState(defaultState)
  const [hydrated, setHydrated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [savedProjectId, setSavedProjectId] = useState(null)
  const [projectStatus, setProjectStatus] = useState('quote')
  const [paymentStatus, setPaymentStatus] = useState('unpaid')
  const [receiptCode, setReceiptCode] = useState(null)
  const [paidAt, setPaidAt] = useState(null)
  const [paidAmount, setPaidAmount] = useState(null)
  const [docMode, setDocMode] = useState('quote') // quote | paid
  const [nextChargeDate, setNextChargeDate] = useState('')
  const [domainRenewalDate, setDomainRenewalDate] = useState('')
  const [saveMessage, setSaveMessage] = useState(null)
  const [appliedLoadId, setAppliedLoadId] = useState(null)

  const { data: loadedProjectData, error: loadProjectError } = useQuery(CLIENT_PROJECT_QUERY, {
    variables: { id: loadProjectId },
    skip: !loadProjectId,
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (loadProjectError) {
      setSaveMessage({ type: 'error', text: 'Failed to load client project.' })
    }
  }, [loadProjectError])

  useEffect(() => {
    if (loadProjectId != null) {
      setAppliedLoadId(null)
    }
  }, [loadProjectId])

  useEffect(() => {
    const p = loadedProjectData?.clientProject
    if (!p || !loadProjectId || p.id !== loadProjectId || appliedLoadId === loadProjectId) return
    try {
      const parsed = JSON.parse(p.calcJson || '{}')
      const merged = { ...defaultState, ...parsed }
      if (p.features?.length) {
        merged.features = (merged.features || []).map((f, i) => {
          const match = p.features.find((df) => df.name === f.name) || p.features[i]
          return match ? { ...f, done: match.done } : f
        })
      }
      merged.quoteClient = p.clientName || merged.quoteClient
      merged.quoteProject = p.projectName || merged.quoteProject
      merged.quoteNotes = p.notes || merged.quoteNotes
      setState(merged)
      setSavedProjectId(p.id)
      setProjectStatus(p.status === 'completed' ? 'past' : p.status || 'quote')
      setPaymentStatus(p.paymentStatus || 'unpaid')
      setReceiptCode(p.receiptCode || null)
      setPaidAt(p.paidAt || null)
      setPaidAmount(p.paidAmount ?? null)
      setDocMode(p.paymentStatus === 'paid_in_full' ? 'paid' : 'quote')
      setNextChargeDate(
        p.nextChargeDate ? new Date(p.nextChargeDate).toISOString().slice(0, 10) : ''
      )
      setDomainRenewalDate(
        p.domainRenewalDate
          ? new Date(p.domainRenewalDate).toISOString().slice(0, 10)
          : ''
      )
      setSaveMessage({ type: 'success', text: `Loaded “${p.clientName} — ${p.projectName}”` })
      setAppliedLoadId(loadProjectId)
      onProjectLoaded?.()
    } catch {
      setSaveMessage({ type: 'error', text: 'Could not load project calculator data.' })
    }
  }, [loadedProjectData, loadProjectId, appliedLoadId, onProjectLoaded])

  const [createProject, { loading: creating }] = useMutation(CREATE_CLIENT_PROJECT, {
    onCompleted: (res) => {
      setSavedProjectId(res.createClientProject.id)
      setPaymentStatus(res.createClientProject.paymentStatus || 'unpaid')
      setReceiptCode(res.createClientProject.receiptCode || null)
      setSaveMessage({
        type: 'success',
        text: `Saved “${res.createClientProject.clientName}”. Open Clients tab anytime.`,
      })
    },
    onError: (e) =>
      setSaveMessage({
        type: 'error',
        text: graphQlErrorText(e, 'Save failed.'),
      }),
  })

  const [updateProject, { loading: updating }] = useMutation(UPDATE_CLIENT_PROJECT, {
    onCompleted: (res) => {
      setPaymentStatus(res.updateClientProject.paymentStatus || paymentStatus)
      setReceiptCode(res.updateClientProject.receiptCode || receiptCode)
      setSaveMessage({
        type: 'success',
        text: `Updated “${res.updateClientProject.clientName}”.`,
      })
    },
    onError: (e) =>
      setSaveMessage({
        type: 'error',
        text: graphQlErrorText(e, 'Update failed.'),
      }),
  })

  const [markPaid, { loading: markingPaid }] = useMutation(MARK_PAID_IN_FULL, {
    onCompleted: (res) => {
      const p = res.markClientProjectPaidInFull
      setPaymentStatus(p.paymentStatus)
      setReceiptCode(p.receiptCode)
      setPaidAt(p.paidAt)
      setPaidAmount(p.paidAmount)
      if (p.status) setProjectStatus(p.status)
      setDocMode('paid')
      setSaveMessage({
        type: 'success',
        text: `Marked paid in full. Stamp code ${p.receiptCode} — print or copy the receipt.`,
      })
    },
    onError: (e) =>
      setSaveMessage({
        type: 'error',
        text: graphQlErrorText(e, 'Could not mark paid.'),
      }),
  })

  const [clearPaid, { loading: clearingPaid }] = useMutation(CLEAR_PAID, {
    onCompleted: () => {
      setPaymentStatus('unpaid')
      setReceiptCode(null)
      setPaidAt(null)
      setPaidAmount(null)
      setDocMode('quote')
      setSaveMessage({
        type: 'success',
        text: 'Payment cleared — old receipt codes no longer verify.',
      })
    },
    onError: (e) =>
      setSaveMessage({
        type: 'error',
        text: graphQlErrorText(e, 'Could not clear payment.'),
      }),
  })

  useEffect(() => {
    setState(loadState())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, hydrated])

  const patch = (partial) => setState((s) => ({ ...s, ...partial }))

  const totals = useMemo(() => {
    const setup = state.setup ? Number(state.setupPrice) || 0 : 0
    const hosting = state.hosting ? Number(state.hostingPrice) || 0 : 0
    const foundation = state.foundation ? Number(state.foundationPrice) || 0 : 0
    const domain = state.domain ? Number(state.domainYear1) || 0 : 0
    const domainRenewal = state.domain ? Number(state.domainRenewal) || 0 : 0
    const featuresTotal = (state.features || []).reduce((sum, f) => {
      const hours = Number(f.hours) || 0
      const rate = Number(f.rate) || 0
      return sum + hours * rate
    }, 0)

    // Studio fee on creative/build work — domain is pass-through, excluded from %
    const buildSubtotal = setup + hosting + foundation + featuresTotal

    let expertise = 0
    if (state.expertiseMode === 'percent') {
      expertise = buildSubtotal * ((Number(state.expertisePercent) || 0) / 100)
    } else {
      expertise = Number(state.expertiseFlat) || 0
    }

    const preDiscount = buildSubtotal + domain + expertise

    let discount = 0
    if (state.discountEnabled) {
      if (state.discountMode === 'percent') {
        discount = preDiscount * ((Number(state.discountPercent) || 0) / 100)
      } else {
        discount = Number(state.discountFlat) || 0
      }
      discount = Math.min(discount, preDiscount)
    }

    const oneTime = Math.max(0, preDiscount - discount)

    const maintHours = state.maintenanceEnabled ? Number(state.maintenanceHours) || 0 : 0
    const hourly = Number(state.hourlyRate) || 0
    const tools = state.toolsEnabled ? Number(state.toolsMonthly) || 0 : 0
    const monthly = maintHours * hourly + tools
    const months = Number(state.maintenanceMonths) || 0
    const recurringYear = monthly * months
    const firstYear = oneTime + recurringYear
    // Year 2+: monthly care × 12 + domain renewal (hosting already billed as Y1 managed block)
    const yearTwoPlus = monthly * 12 + domainRenewal

    return {
      setup,
      hosting,
      foundation,
      domain,
      domainRenewal,
      featuresTotal,
      buildSubtotal,
      expertise,
      preDiscount,
      discount,
      oneTime,
      monthly,
      recurringYear,
      firstYear,
      yearTwoPlus,
      maintHours,
      hourly,
      tools,
    }
  }, [state])

  const toDateTime = (yyyyMmDd) => {
    if (!yyyyMmDd || !String(yyyyMmDd).trim()) return null
    const d = new Date(`${yyyyMmDd}T12:00:00`)
    if (Number.isNaN(d.getTime())) return null
    return d.toISOString()
  }

  const buildSavePayload = () => {
    const clientName = (state.quoteClient || '').trim()
    const projectName = (state.quoteProject || '').trim()
    if (!clientName || !projectName) {
      setSaveMessage({
        type: 'error',
        text: 'Fill Client name and Project name in the Client quote section (or above) before saving.',
      })
      return null
    }
    const features = (state.features || [])
      .filter((f) => (f.name || '').trim())
      .map((f) => ({
        name: String(f.name).trim().slice(0, 200),
        hours: Number(f.hours) || 0,
        rate: Number(f.rate) || 0,
        amount: (Number(f.hours) || 0) * (Number(f.rate) || 0),
        done: !!f.done,
        note: null,
      }))
    return {
      clientName,
      projectName,
      notes: state.quoteNotes?.trim() ? state.quoteNotes.trim().slice(0, 4000) : null,
      status: projectStatus || 'quote',
      nextChargeDate: toDateTime(nextChargeDate),
      domainRenewalDate: toDateTime(domainRenewalDate),
      calcJson: JSON.stringify(state),
      oneTimeTotal: Number(totals.oneTime) || 0,
      monthlyTotal: Number(totals.monthly) || 0,
      firstYearTotal: Number(totals.firstYear) || 0,
      features,
    }
  }

  const handleSave = () => {
    const payload = buildSavePayload()
    if (!payload) return
    if (savedProjectId) {
      updateProject({ variables: { input: { id: savedProjectId, ...payload } } })
    } else {
      createProject({ variables: { input: payload } })
    }
  }

  const handleSaveAsNew = () => {
    setSavedProjectId(null)
    setPaymentStatus('unpaid')
    setReceiptCode(null)
    setPaidAt(null)
    setPaidAmount(null)
    setDocMode('quote')
    const payload = buildSavePayload()
    if (!payload) return
    createProject({ variables: { input: payload } })
  }

  const clearLinkedProject = () => {
    setSavedProjectId(null)
    setPaymentStatus('unpaid')
    setReceiptCode(null)
    setPaidAt(null)
    setPaidAmount(null)
    setDocMode('quote')
    setSaveMessage({ type: 'success', text: 'Unlinked — next save creates a new client.' })
  }

  const isPaidDoc = docMode === 'paid' && paymentStatus === 'paid_in_full' && !!receiptCode

  const handleMarkPaidInFull = async () => {
    let id = savedProjectId
    if (!id) {
      const payload = buildSavePayload()
      if (!payload) return
      try {
        const res = await createProject({ variables: { input: payload } })
        id = res?.data?.createClientProject?.id
        if (!id && res?.errors?.length) {
          setSaveMessage({
            type: 'error',
            text: res.errors[0].message || 'Save failed before marking paid.',
          })
          return
        }
      } catch (e) {
        setSaveMessage({
          type: 'error',
          text: graphQlErrorText(e, 'Save failed before marking paid.'),
        })
        return
      }
    } else {
      const payload = buildSavePayload()
      if (payload) {
        try {
          await updateProject({ variables: { input: { id, ...payload } } })
        } catch (e) {
          setSaveMessage({
            type: 'error',
            text: graphQlErrorText(e, 'Update failed before marking paid.'),
          })
          return
        }
      }
    }
    if (!id) {
      setSaveMessage({ type: 'error', text: 'Save the client first, then mark paid.' })
      return
    }
    markPaid({ variables: { id, amount: Number(totals.oneTime) || 0 } })
  }

  const featureLines = (state.features || []).filter((f) => (f.name || '').trim())

  const addFeature = () => {
    patch({
      features: [
        ...state.features,
        {
          id: String(Date.now()),
          name: '',
          hours: 4,
          rate: Number(state.hourlyRate) || 50,
        },
      ],
    })
  }

  const updateFeature = (id, partial) => {
    patch({
      features: state.features.map((f) => (f.id === id ? { ...f, ...partial } : f)),
    })
  }

  const removeFeature = (id) => {
    patch({ features: state.features.filter((f) => f.id !== id) })
  }

  const resetAll = () => {
    if (window.confirm('Reset calculator to defaults?')) {
      const fresh = { ...defaultState, quoteDate: new Date().toISOString().slice(0, 10) }
      setState(fresh)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const buildClientQuoteText = () => {
    const paid = isPaidDoc
    const lines = [
      paid
        ? 'Filip Rusiecki Video Games — PAID IN FULL RECEIPT'
        : 'Filip Rusiecki Video Games — Project Quote',
      state.quoteClient ? `Prepared for: ${state.quoteClient}` : null,
      state.quoteProject ? `Project: ${state.quoteProject}` : null,
      state.quoteDate ? `Date: ${state.quoteDate}` : null,
      '',
      paid ? '— Paid items —' : '— Project investment —',
    ].filter((l) => l !== null)

    if (state.setup)
      lines.push(`Project setup                        ${moneyOrFree(totals.setup)}`)
    if (state.hosting)
      lines.push(`Managed hosting (year 1)             ${moneyOrFree(totals.hosting)}`)
    if (state.foundation)
      lines.push(`Website foundation (core pages)      ${moneyOrFree(totals.foundation)}`)
    if (state.domain) {
      lines.push(`Domain (first year)                  ${moneyOrFree(totals.domain)}`)
      if (totals.domainRenewal > 0)
        lines.push(`Domain renewal (year 2+)             ${euro(totals.domainRenewal)} / yr`)
      if (domainRenewalDate)
        lines.push(`Domain renews on                     ${domainRenewalDate}`)
    }
    featureLines.forEach((f) => {
      const hours = Number(f.hours) || 0
      const rate = Number(f.rate) || 0
      const amt = hours * rate
      const label = (f.name || 'Custom feature').padEnd(36).slice(0, 36)
      lines.push(`${label} ${moneyOrFree(amt)}`)
      if (hours > 0 || rate > 0) {
        lines.push(`  ${hours}h × ${euro(rate)}/h`)
      }
    })
    if (state.expertiseMode === 'percent' ? Number(state.expertisePercent) > 0 : true)
      lines.push(`Design & development expertise       ${moneyOrFree(totals.expertise)}`)
    if (state.discountEnabled && totals.discount > 0)
      lines.push(`Discount                             −${euro(totals.discount)}`)
    lines.push('')
    lines.push(
      `${paid ? 'Amount paid (one-time)' : 'Amount due (one-time)'}          ${euro(
        paid && paidAmount != null ? paidAmount : totals.oneTime
      )}`
    )
    if (totals.monthly > 0) {
      lines.push('')
      lines.push('— Ongoing care —')
      if (state.maintenanceEnabled && totals.maintHours > 0) {
        lines.push(
          `Maintenance (${totals.maintHours}h / mo @ ${euro(totals.hourly)}/h)  ${euro(
            totals.maintHours * totals.hourly
          )} / mo`
        )
      }
      if (totals.tools)
        lines.push(`Tools & platform subscriptions       ${euro(totals.tools)} / mo`)
      lines.push(`Monthly total                        ${euro(totals.monthly)} / mo`)
      lines.push(
        `First ${state.maintenanceMonths} months care              ${euro(totals.recurringYear)}`
      )
    }
    lines.push('')
    lines.push(`Estimated first-year total           ${euro(totals.firstYear)}`)
    if (totals.yearTwoPlus > 0) {
      lines.push(`Est. year 2+ (care + domain renew)   ${euro(totals.yearTwoPlus)} / yr`)
    }
    if (paid) {
      lines.push('')
      if (paidAt) {
        lines.push(
          `Paid on                              ${new Date(paidAt).toLocaleDateString('en-IE')}`
        )
      }
      lines.push(`Receipt code                         ${receiptCode}`)
      lines.push('Status                               PAID IN FULL')
    }
    if (state.quoteNotes?.trim()) {
      lines.push('')
      lines.push('Notes:')
      lines.push(state.quoteNotes.trim())
    }
    lines.push('')
    lines.push(paid ? 'Thank you for your payment.' : 'Thank you — happy to adjust scope anytime.')
    lines.push('frvg.net')
    return lines.join('\n')
  }

  const copyClientQuote = async () => {
    try {
      await navigator.clipboard.writeText(buildClientQuoteText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const inputClass =
    'w-full px-3 py-2 bg-game-dark border border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none'
  const labelClass = 'block text-game-light/70 text-xs mb-1'

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="print:hidden flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-game-light mb-1">
            Pricing calculator
          </h2>
          <p className="text-game-light/55 text-sm max-w-xl">
            Private quote helper — save clients to the Clients tab for charging &amp; feature tracking.
          </p>
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="text-sm font-semibold text-game-light/50 hover:text-red-400 border border-game-accent/20 px-3 py-2 rounded-lg"
        >
          Reset defaults
        </button>
      </div>

      <section className="print:hidden border-2 border-game-accent/40 rounded-lg p-5 space-y-4 bg-game-accent/5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-game-light">
            {savedProjectId ? `Editing client #${savedProjectId}` : 'Save as client project'}
          </h3>
          {savedProjectId && (
            <button
              type="button"
              onClick={clearLinkedProject}
              className="text-xs font-semibold text-game-light/50 hover:text-game-accent"
            >
              Unlink (save as new next time)
            </button>
          )}
        </div>
        <p className="text-game-light/50 text-xs">
          Uses Client name / Project name / Notes from the Client quote fields below. One-time =
          build only (domain renew reminder). Active = ongoing care. Returning = old client back for
          more work.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className={labelClass}>Client name</label>
            <input
              type="text"
              value={state.quoteClient}
              onChange={(e) => patch({ quoteClient: e.target.value })}
              className={inputClass}
              placeholder="Client"
            />
          </div>
          <div>
            <label className={labelClass}>Project name</label>
            <input
              type="text"
              value={state.quoteProject}
              onChange={(e) => patch({ quoteProject: e.target.value })}
              className={inputClass}
              placeholder="Project"
            />
          </div>
          <div>
            <label className={labelClass}>Client type</label>
            <select
              value={projectStatus}
              onChange={(e) => {
                const v = e.target.value
                setProjectStatus(v)
                if (v === 'one_time') {
                  patch({ maintenanceEnabled: false, toolsEnabled: false, maintenanceMonths: 0 })
                }
              }}
              className={inputClass}
            >
              <option value="quote">Quote (not started)</option>
              <option value="one_time">One-time (build only)</option>
              <option value="active">Active (managed)</option>
              <option value="returning">Returning client</option>
              <option value="paused">Paused</option>
              <option value="past">Past client</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Next charge date</label>
            <input
              type="date"
              value={nextChargeDate}
              onChange={(e) => setNextChargeDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Domain renews on</label>
            <input
              type="date"
              value={domainRenewalDate}
              onChange={(e) => setDomainRenewalDate(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        {saveMessage && (
          <div
            className={`text-sm px-3 py-2 rounded-lg border ${
              saveMessage.type === 'success'
                ? 'border-green-500/40 text-green-400 bg-green-500/10'
                : 'border-red-500/40 text-red-400 bg-red-500/10'
            }`}
          >
            {saveMessage.text}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={creating || updating}
            className="bg-game-accent text-game-dark px-5 py-2.5 rounded-lg text-sm font-bold disabled:opacity-50"
          >
            {creating || updating
              ? 'Saving…'
              : savedProjectId
                ? 'Update client project'
                : 'Save client project'}
          </button>
          {savedProjectId && (
            <button
              type="button"
              onClick={handleSaveAsNew}
              disabled={creating || updating}
              className="border border-game-accent/40 text-game-light px-5 py-2.5 rounded-lg text-sm font-bold"
            >
              Save as new client
            </button>
          )}
        </div>
      </section>

      <div className="print:hidden grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-8 items-start">
        <div className="space-y-6">
          {/* Base one-time */}
          <section className="border border-game-accent/30 rounded-lg p-5 space-y-4">
            <h3 className="text-lg font-bold text-game-light">One-time build</h3>

            {[
              {
                key: 'setup',
                priceKey: 'setupPrice',
                title: 'Project setup',
                hint: 'Repo, boards, local env, kickoff overhead',
              },
              {
                key: 'hosting',
                priceKey: 'hostingPrice',
                title: 'Managed hosting (year 1)',
                hint: 'Hosting + your care — label it managed, not raw server cost',
              },
              {
                key: 'foundation',
                priceKey: 'foundationPrice',
                title: 'Small portfolio / business foundation',
                hint: 'Home, portfolio/about, contact — base pages',
              },
              {
                key: 'domain',
                title: 'Domain',
                hint: 'Promo first year vs normal renewal — common with .com / registrars',
                dual: true,
              },
            ].map((row) => (
              <div
                key={row.key}
                className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-game-accent/10 pb-3 last:border-0 last:pb-0"
              >
                <label className="flex items-start gap-3 flex-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state[row.key]}
                    onChange={(e) => patch({ [row.key]: e.target.checked })}
                    className="mt-1 accent-[#D1AD4A]"
                  />
                  <span>
                    <span className="block text-game-light font-semibold text-sm">{row.title}</span>
                    <span className="block text-game-light/45 text-xs">{row.hint}</span>
                  </span>
                </label>
                {row.dual ? (
                  <div className="flex gap-2 sm:w-auto">
                    <div className="w-24">
                      <label className={labelClass}>Y1 €</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        disabled={!state.domain}
                        value={state.domainYear1}
                        onChange={(e) => patch({ domainYear1: e.target.value })}
                        className={`${inputClass} disabled:opacity-40`}
                      />
                    </div>
                    <div className="w-24">
                      <label className={labelClass}>Renew €</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        disabled={!state.domain}
                        value={state.domainRenewal}
                        onChange={(e) => patch({ domainRenewal: e.target.value })}
                        className={`${inputClass} disabled:opacity-40`}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="sm:w-32">
                    <label className={labelClass}>€</label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      disabled={!state[row.key]}
                      value={state[row.priceKey]}
                      onChange={(e) => patch({ [row.priceKey]: e.target.value })}
                      className={`${inputClass} disabled:opacity-40`}
                    />
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Discount — prominent */}
          <section
            className={`rounded-lg p-5 space-y-4 border-2 ${
              state.discountEnabled
                ? 'border-green-500/60 bg-green-500/10'
                : 'border-dashed border-green-500/40 bg-green-500/5'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-green-400">Discount</h3>
                <p className="text-game-light/55 text-xs">
                  Friends &amp; family, launch offer, package deal — optional.
                </p>
              </div>
              <button
                type="button"
                onClick={() => patch({ discountEnabled: !state.discountEnabled })}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  state.discountEnabled
                    ? 'bg-green-500 text-game-dark'
                    : 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30'
                }`}
              >
                {state.discountEnabled ? 'Discount ON' : '+ Add discount'}
              </button>
            </div>

            {state.discountEnabled && (
              <>
                <div className="rounded-lg border border-green-500/40 bg-green-500/15 px-4 py-3 text-sm text-green-300 font-semibold">
                  Discount applied: −{euro(totals.discount)}
                  {state.discountMode === 'percent'
                    ? ` (${state.discountPercent}% off)`
                    : ' (flat)'}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => patch({ discountMode: 'flat' })}
                    className={`px-4 py-2 rounded-lg text-sm font-bold ${
                      state.discountMode === 'flat'
                        ? 'bg-green-500 text-game-dark'
                        : 'border border-green-500/40 text-green-400'
                    }`}
                  >
                    Flat €
                  </button>
                  <button
                    type="button"
                    onClick={() => patch({ discountMode: 'percent' })}
                    className={`px-4 py-2 rounded-lg text-sm font-bold ${
                      state.discountMode === 'percent'
                        ? 'bg-green-500 text-game-dark'
                        : 'border border-green-500/40 text-green-400'
                    }`}
                  >
                    Percent
                  </button>
                </div>
                <div className="max-w-[180px]">
                  {state.discountMode === 'flat' ? (
                    <>
                      <label className={labelClass}>Discount amount (€)</label>
                      <input
                        type="number"
                        min="0"
                        step="10"
                        value={state.discountFlat}
                        onChange={(e) => patch({ discountFlat: e.target.value })}
                        className={inputClass}
                      />
                    </>
                  ) : (
                    <>
                      <label className={labelClass}>Discount (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={state.discountPercent}
                        onChange={(e) => patch({ discountPercent: e.target.value })}
                        className={inputClass}
                      />
                    </>
                  )}
                </div>
              </>
            )}
          </section>

          {/* Features */}
          <section className="border border-game-accent/30 rounded-lg p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-game-light">Extra features</h3>
                <p className="text-game-light/45 text-xs">
                  Price by hours × rate so a 10h feature never pays like a 1h tweak.
                </p>
              </div>
              <button
                type="button"
                onClick={addFeature}
                className="bg-game-accent text-game-dark px-4 py-2 rounded-lg text-sm font-bold hover:brightness-110"
              >
                + Add feature
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
              <div className="sm:col-span-1">
                <label className={labelClass}>Default hourly rate (€)</label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={state.hourlyRate}
                  onChange={(e) => patch({ hourlyRate: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {(state.features || []).length === 0 ? (
              <p className="text-game-light/40 text-sm">No extra features yet.</p>
            ) : (
              <ul className="space-y-3">
                {state.features.map((f) => {
                  const line = (Number(f.hours) || 0) * (Number(f.rate) || 0)
                  return (
                    <li
                      key={f.id}
                      className="grid grid-cols-1 md:grid-cols-[1fr_80px_90px_70px_auto] gap-2 items-end border border-game-accent/15 rounded-lg p-3"
                    >
                      <div>
                        <label className={labelClass}>Feature</label>
                        <input
                          type="text"
                          value={f.name}
                          onChange={(e) => updateFeature(f.id, { name: e.target.value })}
                          placeholder="e.g. Reviews system"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Hours</label>
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={f.hours}
                          onChange={(e) => updateFeature(f.id, { hours: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>€ / hr</label>
                        <input
                          type="number"
                          min="0"
                          step="5"
                          value={f.rate}
                          onChange={(e) => updateFeature(f.id, { rate: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div className="text-game-accent font-bold text-sm pb-2">{euro(line)}</div>
                      <button
                        type="button"
                        onClick={() => removeFeature(f.id)}
                        className="text-red-400 text-xs font-semibold hover:underline pb-2"
                      >
                        Remove
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>

          {/* Expertise */}
          <section className="border border-game-accent/30 rounded-lg p-5 space-y-4">
            <h3 className="text-lg font-bold text-game-light">Your knowledge / studio fee</h3>
            <p className="text-game-light/45 text-xs">
              Default 18% of build (domain excluded). Flat fee also available.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => patch({ expertiseMode: 'percent' })}
                className={`px-4 py-2 rounded-lg text-sm font-bold ${
                  state.expertiseMode === 'percent'
                    ? 'bg-game-accent text-game-dark'
                    : 'border border-game-accent/30 text-game-light'
                }`}
              >
                % of build
              </button>
              <button
                type="button"
                onClick={() => patch({ expertiseMode: 'flat' })}
                className={`px-4 py-2 rounded-lg text-sm font-bold ${
                  state.expertiseMode === 'flat'
                    ? 'bg-game-accent text-game-dark'
                    : 'border border-game-accent/30 text-game-light'
                }`}
              >
                Flat fee
              </button>
            </div>
            {state.expertiseMode === 'percent' ? (
              <div className="max-w-[160px]">
                <label className={labelClass}>Percent of build subtotal</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={state.expertisePercent}
                  onChange={(e) => patch({ expertisePercent: e.target.value })}
                  className={inputClass}
                />
              </div>
            ) : (
              <div className="max-w-[160px]">
                <label className={labelClass}>Flat expertise (€)</label>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={state.expertiseFlat}
                  onChange={(e) => patch({ expertiseFlat: e.target.value })}
                  className={inputClass}
                />
              </div>
            )}
          </section>

          {/* Recurring */}
          <section className="border border-game-accent/30 rounded-lg p-5 space-y-4">
            <h3 className="text-lg font-bold text-game-light">Monthly / retainer</h3>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={state.maintenanceEnabled}
                onChange={(e) => patch({ maintenanceEnabled: e.target.checked })}
                className="mt-1 accent-[#D1AD4A]"
              />
              <span>
                <span className="block text-game-light font-semibold text-sm">
                  Maintenance (hours × hourly rate)
                </span>
                <span className="block text-game-light/45 text-xs">
                  Avoids €100 flat for 20h of work — set included hours honestly.
                </span>
              </span>
            </label>
            {state.maintenanceEnabled && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pl-7">
                <div>
                  <label className={labelClass}>Hours / month</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={state.maintenanceHours}
                    onChange={(e) => patch({ maintenanceHours: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>€ / hr</label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={state.hourlyRate}
                    onChange={(e) => patch({ hourlyRate: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 flex items-end">
                  <p className="text-sm text-game-accent font-bold pb-2">
                    = {euro(totals.maintHours * totals.hourly)} / mo
                  </p>
                </div>
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={state.toolsEnabled}
                onChange={(e) => patch({ toolsEnabled: e.target.checked })}
                className="mt-1 accent-[#D1AD4A]"
              />
              <span>
                <span className="block text-game-light font-semibold text-sm">
                  Tools / subscriptions
                </span>
                <span className="block text-game-light/45 text-xs">
                  Pass-through + small margin for Cursor, domains tools, etc.
                </span>
              </span>
            </label>
            {state.toolsEnabled && (
              <div className="max-w-[160px] pl-7">
                <label className={labelClass}>€ / month</label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={state.toolsMonthly}
                  onChange={(e) => patch({ toolsMonthly: e.target.value })}
                  className={inputClass}
                />
              </div>
            )}

            <div className="max-w-[160px]">
              <label className={labelClass}>Months to include in year total</label>
              <input
                type="number"
                min="0"
                max="24"
                step="1"
                value={state.maintenanceMonths}
                onChange={(e) => patch({ maintenanceMonths: e.target.value })}
                className={inputClass}
              />
            </div>
          </section>
        </div>

        {/* Totals sticky — admin */}
        <aside className="xl:sticky xl:top-24 border-2 border-game-accent/40 rounded-lg p-5 bg-game-dark/80 space-y-4 shadow-[0_0_40px_-16px_rgba(209,173,74,0.35)]">
          <h3 className="text-lg font-bold text-game-light">Quote summary</h3>

          {state.discountEnabled && totals.discount > 0 && (
            <div className="rounded-lg border border-green-500/50 bg-green-500/15 px-3 py-2 text-sm font-bold text-green-400">
              Discount active −{euro(totals.discount)}
            </div>
          )}

          <dl className="space-y-2 text-sm">
            {state.setup && (
              <div className="flex justify-between gap-4 text-game-light/70">
                <dt>Project setup</dt>
                <dd className={totals.setup === 0 ? 'text-green-400/90' : ''}>
                  {moneyOrFree(totals.setup)}
                </dd>
              </div>
            )}
            {state.hosting && (
              <div className="flex justify-between gap-4 text-game-light/70">
                <dt>Managed hosting (Y1)</dt>
                <dd className={totals.hosting === 0 ? 'text-green-400/90' : ''}>
                  {moneyOrFree(totals.hosting)}
                </dd>
              </div>
            )}
            {state.foundation && (
              <div className="flex justify-between gap-4 text-game-light/70">
                <dt>Foundation pages</dt>
                <dd className={totals.foundation === 0 ? 'text-green-400/90' : ''}>
                  {moneyOrFree(totals.foundation)}
                </dd>
              </div>
            )}
            {state.domain && (
              <>
                <div className="flex justify-between gap-4 text-game-light/70">
                  <dt>Domain (first year)</dt>
                  <dd className={totals.domain === 0 ? 'text-green-400/90' : ''}>
                    {moneyOrFree(totals.domain)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 text-game-light/50 text-xs">
                  <dt>Domain renewal (Y2+)</dt>
                  <dd>
                    {totals.domainRenewal === 0
                      ? 'Included — no charge / yr'
                      : `${euro(totals.domainRenewal)} / yr`}
                  </dd>
                </div>
                {domainRenewalDate && (
                  <div className="flex justify-between gap-4 text-amber-400/90 text-xs">
                    <dt>Domain renews on</dt>
                    <dd>{domainRenewalDate}</dd>
                  </div>
                )}
              </>
            )}
            {featureLines.length > 0 && (
              <div className="flex justify-between gap-4 text-game-light/70">
                <dt>Extra features</dt>
                <dd className={totals.featuresTotal === 0 ? 'text-green-400/90' : ''}>
                  {moneyOrFree(totals.featuresTotal)}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-4 text-game-light/70 border-t border-game-accent/15 pt-2">
              <dt>Build subtotal</dt>
              <dd>{euro(totals.buildSubtotal)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-game-light/70">
              <dt>Knowledge / studio fee</dt>
              <dd>{euro(totals.expertise)}</dd>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between gap-4 text-green-400/90">
                <dt>Discount</dt>
                <dd>−{euro(totals.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between gap-4 text-game-light font-bold text-base border-t border-game-accent/25 pt-2">
              <dt>One-time total</dt>
              <dd className="text-game-accent">{euro(totals.oneTime)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-game-light/70 pt-2">
              <dt>Monthly retainer</dt>
              <dd>{euro(totals.monthly)} / mo</dd>
            </div>
            <div className="flex justify-between gap-4 text-game-light/70">
              <dt>Recurring ({state.maintenanceMonths} mo)</dt>
              <dd>{euro(totals.recurringYear)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-game-light font-bold text-lg border-t border-game-accent/40 pt-3">
              <dt>First-year total</dt>
              <dd className="text-game-accent">{euro(totals.firstYear)}</dd>
            </div>
            {totals.yearTwoPlus > 0 && (
              <div className="flex justify-between gap-4 text-game-light/60 text-sm">
                <dt>Est. year 2+ / yr</dt>
                <dd>{euro(totals.yearTwoPlus)}</dd>
              </div>
            )}
          </dl>

          <div className="text-xs text-game-light/40 space-y-2 pt-2 border-t border-game-accent/15">
            <p>Admin view — use the client quote below to share with customers.</p>
          </div>
        </aside>
      </div>

      <div className="print:hidden h-6 md:h-10" aria-hidden="true" />

      {/* Professional client quote */}
      <section className="border border-game-accent/35 rounded-lg overflow-hidden print:border-0">
        <div className="print:hidden flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-game-accent/20 bg-game-accent/5">
          <div>
            <h3 className="text-lg font-bold text-game-light">Client document</h3>
            <p className="text-game-light/50 text-xs">
              Send a Quote for amount due, then Mark paid in full for a stamped receipt that anyone
              can verify online (edited PDFs won’t match).
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setDocMode('quote')}
              className={`px-4 py-2 rounded-lg text-sm font-bold ${
                docMode === 'quote'
                  ? 'bg-game-accent text-game-dark'
                  : 'border border-game-accent/40 text-game-light'
              }`}
            >
              Quote
            </button>
            <button
              type="button"
              onClick={() => {
                if (paymentStatus === 'paid_in_full' && receiptCode) setDocMode('paid')
                else handleMarkPaidInFull()
              }}
              disabled={markingPaid || creating || updating}
              className={`px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50 ${
                docMode === 'paid' && isPaidDoc
                  ? 'bg-green-500 text-game-dark'
                  : 'border border-green-500/50 text-green-400 hover:bg-green-500/10'
              }`}
            >
              {markingPaid
                ? 'Saving…'
                : paymentStatus === 'paid_in_full'
                  ? 'Paid in full'
                  : 'Mark paid in full'}
            </button>
            {paymentStatus === 'paid_in_full' && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Clear paid status? Old receipt codes will stop verifying.')) {
                    clearPaid({ variables: { id: savedProjectId } })
                  }
                }}
                disabled={!savedProjectId || clearingPaid}
                className="border border-red-500/40 text-red-400 px-3 py-2 rounded-lg text-xs font-bold disabled:opacity-40"
              >
                Clear paid
              </button>
            )}
            <button
              type="button"
              onClick={copyClientQuote}
              className="bg-game-accent text-game-dark px-4 py-2 rounded-lg text-sm font-bold hover:brightness-110"
            >
              {copied ? 'Copied!' : isPaidDoc ? 'Copy receipt' : 'Copy quote'}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="border border-game-accent/40 text-game-light px-4 py-2 rounded-lg text-sm font-bold hover:border-game-accent"
            >
              Print
            </button>
          </div>
        </div>

        <div className="print:hidden grid grid-cols-1 md:grid-cols-3 gap-3 p-5 border-b border-game-accent/15">
          <div>
            <label className={labelClass}>Client name</label>
            <input
              type="text"
              value={state.quoteClient}
              onChange={(e) => patch({ quoteClient: e.target.value })}
              placeholder="Client or business"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Project name</label>
            <input
              type="text"
              value={state.quoteProject}
              onChange={(e) => patch({ quoteProject: e.target.value })}
              placeholder="e.g. Portfolio website"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input
              type="date"
              value={state.quoteDate}
              onChange={(e) => patch({ quoteDate: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-3">
            <label className={labelClass}>Notes (optional)</label>
            <textarea
              value={state.quoteNotes}
              onChange={(e) => patch({ quoteNotes: e.target.value })}
              rows={2}
              placeholder="Payment terms, timeline, what’s included…"
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        <div
          id="client-quote-sheet"
          className="p-6 md:p-8 bg-[#1a1918] text-game-light print:bg-white print:text-black"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-game-accent print:text-neutral-800 font-semibold tracking-[0.15em] uppercase text-xs mb-2">
                Filip Rusiecki Video Games
              </p>
              <h4 className="text-2xl font-bold">
                {isPaidDoc ? 'Paid in full receipt' : 'Project quote'}
              </h4>
              {state.quoteProject && (
                <p className="text-game-light/70 print:text-neutral-600 mt-1">{state.quoteProject}</p>
              )}
            </div>
            <div className="text-sm text-game-light/60 print:text-neutral-600 text-right">
              {state.quoteClient && <p>Prepared for {state.quoteClient}</p>}
              {state.quoteDate && (
                <p>
                  {new Date(state.quoteDate + 'T12:00:00').toLocaleDateString('en-IE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
              {isPaidDoc && (
                <div className="mt-3 inline-block border-2 border-green-600 text-green-500 print:border-green-700 print:text-green-800 px-3 py-2 rounded rotate-[-6deg]">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase">Official stamp</p>
                  <p className="text-sm font-black tracking-wide">PAID IN FULL</p>
                  <p className="text-[10px] font-mono mt-0.5">{receiptCode}</p>
                </div>
              )}
            </div>
          </div>

          <table className="w-full text-sm mb-6">
            <tbody>
              {state.setup && (
                <tr className="border-b border-game-accent/15 print:border-neutral-200">
                  <td className="py-3 pr-4">Project setup</td>
                  <td
                    className={`py-3 text-right font-semibold ${
                      totals.setup === 0 ? 'text-green-400 print:text-green-700' : ''
                    }`}
                  >
                    {moneyOrFree(totals.setup)}
                  </td>
                </tr>
              )}
              {state.hosting && (
                <tr className="border-b border-game-accent/15 print:border-neutral-200">
                  <td className="py-3 pr-4">Managed hosting (year 1)</td>
                  <td
                    className={`py-3 text-right font-semibold ${
                      totals.hosting === 0 ? 'text-green-400 print:text-green-700' : ''
                    }`}
                  >
                    {moneyOrFree(totals.hosting)}
                  </td>
                </tr>
              )}
              {state.foundation && (
                <tr className="border-b border-game-accent/15 print:border-neutral-200">
                  <td className="py-3 pr-4">Website foundation (core pages)</td>
                  <td
                    className={`py-3 text-right font-semibold ${
                      totals.foundation === 0 ? 'text-green-400 print:text-green-700' : ''
                    }`}
                  >
                    {moneyOrFree(totals.foundation)}
                  </td>
                </tr>
              )}
              {state.domain && (
                <tr className="border-b border-game-accent/15 print:border-neutral-200">
                  <td className="py-3 pr-4">
                    Domain (first year)
                    {totals.domainRenewal > 0 ? (
                      <span className="block text-xs text-game-light/45 print:text-neutral-500 font-normal mt-0.5">
                        Renews at {euro(totals.domainRenewal)} / year from year 2
                      </span>
                    ) : (
                      <span className="block text-xs text-green-400/80 print:text-green-700 font-normal mt-0.5">
                        Renewal included — no charge from year 2
                      </span>
                    )}
                    {domainRenewalDate && (
                      <span className="block text-xs text-game-light/45 print:text-neutral-500 font-normal mt-0.5">
                        Next renew date: {domainRenewalDate}
                      </span>
                    )}
                  </td>
                  <td
                    className={`py-3 text-right font-semibold align-top ${
                      totals.domain === 0 ? 'text-green-400 print:text-green-700' : ''
                    }`}
                  >
                    {moneyOrFree(totals.domain)}
                  </td>
                </tr>
              )}
              {featureLines.map((f) => {
                const hours = Number(f.hours) || 0
                const rate = Number(f.rate) || 0
                const amt = hours * rate
                return (
                  <tr
                    key={f.id}
                    className="border-b border-game-accent/15 print:border-neutral-200"
                  >
                    <td className="py-3 pr-4">
                      {f.name || 'Custom feature'}
                      {(hours > 0 || rate > 0) && (
                        <span className="block text-xs text-game-light/45 print:text-neutral-500 font-normal mt-0.5">
                          {hours}h × {euro(rate)}/h
                        </span>
                      )}
                    </td>
                    <td
                      className={`py-3 text-right font-semibold align-top ${
                        amt === 0 ? 'text-green-400 print:text-green-700' : ''
                      }`}
                    >
                      {moneyOrFree(amt)}
                    </td>
                  </tr>
                )
              })}
              {(state.expertiseMode === 'percent'
                ? Number(state.expertisePercent) > 0 || totals.expertise > 0
                : true) && (
                <tr className="border-b border-game-accent/15 print:border-neutral-200">
                  <td className="py-3 pr-4">
                    Design & development expertise
                    {state.expertiseMode === 'percent' && Number(state.expertisePercent) > 0 && (
                      <span className="block text-xs text-game-light/45 print:text-neutral-500 font-normal mt-0.5">
                        {state.expertisePercent}% studio fee
                      </span>
                    )}
                  </td>
                  <td
                    className={`py-3 text-right font-semibold align-top ${
                      totals.expertise === 0 ? 'text-green-400 print:text-green-700' : ''
                    }`}
                  >
                    {moneyOrFree(totals.expertise)}
                  </td>
                </tr>
              )}
              {totals.discount > 0 && (
                <tr className="border-b border-game-accent/15 print:border-neutral-200 text-green-400 print:text-green-700">
                  <td className="py-3 pr-4">Discount</td>
                  <td className="py-3 text-right font-semibold">−{euro(totals.discount)}</td>
                </tr>
              )}
              <tr>
                <td className="pt-4 pr-4 text-base font-bold">
                  {isPaidDoc ? 'Amount paid (one-time)' : 'Amount due (one-time)'}
                </td>
                <td className="pt-4 text-right text-base font-bold text-game-accent print:text-neutral-900">
                  {euro(isPaidDoc && paidAmount != null ? paidAmount : totals.oneTime)}
                </td>
              </tr>
            </tbody>
          </table>

          {totals.monthly > 0 && (
            <div className="mb-6 pt-4 border-t border-game-accent/25 print:border-neutral-300">
              <p className="text-xs font-semibold tracking-wider uppercase text-game-accent print:text-neutral-700 mb-3">
                Ongoing care
              </p>
              <table className="w-full text-sm">
                <tbody>
                  {state.maintenanceEnabled && totals.maintHours > 0 && (
                    <tr className="border-b border-game-accent/15 print:border-neutral-200">
                      <td className="py-2 pr-4">
                        Maintenance ({totals.maintHours}h / month @ {euro(totals.hourly)}/h)
                      </td>
                      <td className="py-2 text-right font-semibold">
                        {euro(totals.maintHours * totals.hourly)} / mo
                      </td>
                    </tr>
                  )}
                  {totals.tools > 0 && (
                    <tr className="border-b border-game-accent/15 print:border-neutral-200">
                      <td className="py-2 pr-4">Tools & platform subscriptions</td>
                      <td className="py-2 text-right font-semibold">{euro(totals.tools)} / mo</td>
                    </tr>
                  )}
                  <tr className="border-b border-game-accent/15 print:border-neutral-200">
                    <td className="py-2 pr-4 font-bold">Monthly total</td>
                    <td className="py-2 text-right font-bold text-game-accent print:text-neutral-900">
                      {euro(totals.monthly)} / mo
                    </td>
                  </tr>
                  <tr>
                    <td className="pt-3 pr-4">
                      First {state.maintenanceMonths} months care
                    </td>
                    <td className="pt-3 text-right font-semibold">
                      {euro(totals.recurringYear)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-game-accent/30 print:border-neutral-400">
            <div className="text-sm text-game-light/55 print:text-neutral-600 max-w-md">
              {state.quoteNotes?.trim() ? (
                <p className="whitespace-pre-wrap">{state.quoteNotes}</p>
              ) : isPaidDoc ? (
                <p>Thank you for your payment. Prices in EUR.</p>
              ) : (
                <p>Scope can be adjusted before work begins. Prices in EUR.</p>
              )}
              {isPaidDoc && paidAt && (
                <p className="mt-2 text-xs text-game-light/45 print:text-neutral-500">
                  Recorded paid{' '}
                  {new Date(paidAt).toLocaleDateString('en-IE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {receiptCode ? ` · ${receiptCode}` : ''}
                </p>
              )}
            </div>
            <div className="text-right space-y-3">
              {isPaidDoc && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-green-500/80 print:text-green-700 mb-1">
                    Status
                  </p>
                  <p className="text-xl font-bold text-green-400 print:text-green-800">
                    Paid in full
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-wider text-game-light/45 print:text-neutral-500 mb-1">
                  Est. first-year total
                </p>
                <p className="text-3xl font-bold text-game-accent print:text-neutral-900">
                  {euro(totals.firstYear)}
                </p>
                {totals.yearTwoPlus > 0 && (
                  <p className="text-xs text-game-light/45 print:text-neutral-500 mt-2">
                    From year 2 ≈ {euro(totals.yearTwoPlus)} / yr
                    {totals.domainRenewal > 0 ? ' (incl. domain renewal)' : ''}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminPricingCalculator
