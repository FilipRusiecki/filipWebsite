import { useMemo, useState } from 'react'
import { useQuery, useMutation } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'

const CLIENT_PROJECTS_QUERY = gql`
  query AdminClientProjectsQuery {
    clientProjects {
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
      lastChargedAt
      oneTimeTotal
      monthlyTotal
      firstYearTotal
      updatedAt
      features {
        id
        name
        hours
        rate
        amount
        done
        doneAt
        note
        createdAt
      }
    }
  }
`

const ADD_FEATURE = gql`
  mutation AddClientProjectFeatureMutation($input: AddClientProjectFeatureInput!) {
    addClientProjectFeature(input: $input) {
      id
      name
      hours
      rate
      amount
      done
    }
  }
`

const SET_FEATURE_DONE = gql`
  mutation SetClientProjectFeatureDoneMutation($id: Int!, $done: Boolean!) {
    setClientProjectFeatureDone(id: $id, done: $done) {
      id
      done
      doneAt
    }
  }
`

const MARK_CHARGED = gql`
  mutation MarkClientProjectChargedMutation($id: Int!, $nextChargeDate: DateTime) {
    markClientProjectCharged(id: $id, nextChargeDate: $nextChargeDate) {
      id
      lastChargedAt
      nextChargeDate
    }
  }
`

const MARK_PAID = gql`
  mutation MarkPaidFromClientsMutation($id: Int!, $amount: Float) {
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

const VERIFY_RECEIPT_CODE = gql`
  query AdminVerifyReceiptCodeQuery($code: String!) {
    verifyClientReceipt(code: $code) {
      valid
      clientName
      projectName
      paidAmount
      paidAt
      receiptCode
      paymentStatus
      message
    }
  }
`

const CLEAR_PAID = gql`
  mutation ClearPaidFromClientsMutation($id: Int!) {
    clearClientProjectPaid(id: $id) {
      id
      paymentStatus
      receiptCode
    }
  }
`

const DELETE_PROJECT = gql`
  mutation DeleteClientProjectMutation($id: Int!) {
    deleteClientProject(id: $id) {
      id
    }
  }
`

const euro = (n) =>
  `€${Number(n || 0).toLocaleString('en-IE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`

const formatDate = (d) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const isOverdue = (d) => {
  if (!d) return false
  const day = new Date(d)
  day.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return day < today
}

const isDueSoon = (d, withinDays = 30) => {
  if (!d) return false
  const day = new Date(d)
  day.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const limit = new Date(today)
  limit.setDate(limit.getDate() + withinDays)
  return day <= limit
}

const STATUS_LABEL = {
  quote: 'Quote',
  one_time: 'One-time',
  active: 'Active',
  returning: 'Returning',
  paused: 'Paused',
  past: 'Past',
  completed: 'Past',
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'quote', label: 'Quotes' },
  { id: 'unpaid', label: 'Unpaid' },
  { id: 'paid', label: 'Paid' },
  { id: 'one_time', label: 'One-time' },
  { id: 'active', label: 'Active' },
  { id: 'returning', label: 'Returning' },
  { id: 'past', label: 'Past' },
  { id: 'due', label: 'Charge due' },
  { id: 'domain', label: 'Domain soon' },
]

const AdminClientsPanel = ({ onOpenInCalculator }) => {
  const { data, loading, refetch } = useQuery(CLIENT_PROJECTS_QUERY, {
    fetchPolicy: 'network-only',
  })
  const [selectedId, setSelectedId] = useState(null)
  const [newFeature, setNewFeature] = useState({ name: '', hours: 2, rate: 50, note: '' })
  const [statusFilter, setStatusFilter] = useState('all')
  const [codeInput, setCodeInput] = useState('')
  const [codeToCheck, setCodeToCheck] = useState(null)

  const { data: verifyData, loading: verifying } = useQuery(VERIFY_RECEIPT_CODE, {
    variables: { code: codeToCheck || '' },
    skip: !codeToCheck,
    fetchPolicy: 'network-only',
  })
  const verifyResult = verifyData?.verifyClientReceipt

  const [addFeature, { loading: adding }] = useMutation(ADD_FEATURE, {
    onCompleted: () => {
      setNewFeature({ name: '', hours: 2, rate: 50, note: '' })
      refetch()
    },
  })
  const [setDone] = useMutation(SET_FEATURE_DONE, { onCompleted: () => refetch() })
  const [markCharged] = useMutation(MARK_CHARGED, { onCompleted: () => refetch() })
  const [markPaid] = useMutation(MARK_PAID, { onCompleted: () => refetch() })
  const [clearPaid] = useMutation(CLEAR_PAID, { onCompleted: () => refetch() })
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    onCompleted: () => {
      setSelectedId(null)
      refetch()
    },
  })

  const projects = data?.clientProjects || []

  const earnings = useMemo(() => {
    let earned = 0
    let paidCount = 0
    let pipeline = 0
    let monthlyRecurring = 0

    projects.forEach((p) => {
      if (p.paymentStatus === 'paid_in_full') {
        paidCount += 1
        earned += Number(p.paidAmount != null ? p.paidAmount : p.oneTimeTotal) || 0
      } else {
        pipeline += Number(p.oneTimeTotal) || 0
      }
      if (p.status === 'active' && Number(p.monthlyTotal) > 0) {
        monthlyRecurring += Number(p.monthlyTotal) || 0
      }
    })

    return { earned, paidCount, pipeline, monthlyRecurring, totalProjects: projects.length }
  }, [projects])

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return projects
    if (statusFilter === 'due') {
      return projects.filter((p) => p.nextChargeDate && isOverdue(p.nextChargeDate))
    }
    if (statusFilter === 'domain') {
      return projects.filter((p) => isDueSoon(p.domainRenewalDate, 30))
    }
    if (statusFilter === 'unpaid') {
      return projects.filter((p) => p.paymentStatus !== 'paid_in_full')
    }
    if (statusFilter === 'paid') {
      return projects.filter((p) => p.paymentStatus === 'paid_in_full')
    }
    if (statusFilter === 'past') {
      return projects.filter((p) => p.status === 'past' || p.status === 'completed')
    }
    return projects.filter((p) => p.status === statusFilter)
  }, [projects, statusFilter])

  const selected = projects.find((p) => p.id === selectedId) || null
  const verifyUrl =
    selected?.receiptCode && typeof window !== 'undefined'
      ? `${window.location.origin}/receipt/${selected.receiptCode}`
      : null

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-game-light mb-1">Clients</h2>
          <p className="text-game-light/55 text-sm max-w-xl">
            Quotes, one-time builds, active retainers, returning &amp; past clients — plus domain
            renewals and stamped paid receipts.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStatusFilter(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                statusFilter === s.id
                  ? 'bg-game-accent text-game-dark'
                  : 'border border-game-accent/30 text-game-light/70'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="sm:col-span-2 border-2 border-game-accent/40 rounded-lg p-4 md:p-5 bg-gradient-to-br from-game-accent/15 to-transparent shadow-[0_0_40px_-18px_rgba(209,173,74,0.45)]">
          <p className="text-game-light/50 text-xs uppercase tracking-wider mb-1">
            Total earned (paid in full)
          </p>
          <p className="text-3xl md:text-4xl font-bold text-game-accent tabular-nums">
            {loading ? '…' : euro(earnings.earned)}
          </p>
          <p className="text-game-light/40 text-xs mt-2">
            Just for you — from {earnings.paidCount} paid project
            {earnings.paidCount === 1 ? '' : 's'}
            {earnings.totalProjects
              ? ` · ${earnings.totalProjects} saved total`
              : ''}
          </p>
        </div>
        <div className="border border-game-accent/25 rounded-lg p-4 bg-game-dark/50">
          <p className="text-game-light/45 text-xs mb-1">Still in pipeline</p>
          <p className="text-2xl font-bold text-game-light tabular-nums">
            {loading ? '…' : euro(earnings.pipeline)}
          </p>
          <p className="text-game-light/35 text-xs mt-1">Unpaid quotes / projects</p>
        </div>
        <div className="border border-game-accent/25 rounded-lg p-4 bg-game-dark/50">
          <p className="text-game-light/45 text-xs mb-1">Active monthly</p>
          <p className="text-2xl font-bold text-game-light tabular-nums">
            {loading ? '…' : `${euro(earnings.monthlyRecurring)}/mo`}
          </p>
          <p className="text-game-light/35 text-xs mt-1">From active retainers</p>
        </div>
      </div>

      <div className="border border-game-accent/30 rounded-lg p-4 md:p-5 bg-game-dark/40">
        <h3 className="text-sm font-bold text-game-light mb-1">Receipt code checker</h3>
        <p className="text-game-light/45 text-xs mb-3">
          Paste a code someone sends you (e.g. FRVG-85AD24C5) to confirm it is really paid in full.
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const c = codeInput.trim().toUpperCase()
                if (c) setCodeToCheck(c)
              }
            }}
            placeholder="FRVG-XXXXXXXX"
            className="flex-1 min-w-[200px] px-3 py-2 bg-game-dark border border-game-accent/30 rounded-lg text-game-light font-mono text-sm"
          />
          <button
            type="button"
            disabled={verifying || !codeInput.trim()}
            onClick={() => {
              const c = codeInput.trim().toUpperCase()
              if (c) setCodeToCheck(c)
            }}
            className="bg-game-accent text-game-dark px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-40"
          >
            {verifying ? 'Checking…' : 'Check code'}
          </button>
        </div>
        {codeToCheck && verifyResult && !verifying && (
          <div
            className={`mt-3 rounded-lg border px-4 py-3 text-sm ${
              verifyResult.valid
                ? 'border-green-500/50 bg-green-500/10 text-green-400'
                : 'border-red-500/40 bg-red-500/10 text-red-400'
            }`}
          >
            <p className="font-bold mb-1">
              {verifyResult.valid ? 'Paid in full — verified' : 'Not a valid paid receipt'}
            </p>
            <p className="text-game-light/60 text-xs mb-2">{verifyResult.message}</p>
            {verifyResult.valid && (
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-game-light/80">
                <div>
                  <span className="text-game-light/45">Client: </span>
                  {verifyResult.clientName}
                </div>
                <div>
                  <span className="text-game-light/45">Project: </span>
                  {verifyResult.projectName}
                </div>
                <div>
                  <span className="text-game-light/45">Amount: </span>
                  {euro(verifyResult.paidAmount)}
                </div>
                <div>
                  <span className="text-game-light/45">Paid: </span>
                  {formatDate(verifyResult.paidAt)}
                </div>
                <div className="sm:col-span-2 font-mono">
                  <span className="text-game-light/45">Code: </span>
                  {verifyResult.receiptCode}
                </div>
              </dl>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
        <div className="border border-game-accent/30 rounded-lg p-4 max-h-[70vh] overflow-y-auto space-y-2">
          {loading ? (
            <p className="text-game-light/50 text-sm">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="text-game-light/50 text-sm">
              No clients in this filter. Save from Pricing, or switch filter.
            </p>
          ) : (
            filtered.map((p) => {
              const due = p.nextChargeDate && isOverdue(p.nextChargeDate)
              const domainSoon = isDueSoon(p.domainRenewalDate, 30)
              const domainOverdue = isOverdue(p.domainRenewalDate)
              const paid = p.paymentStatus === 'paid_in_full'
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedId === p.id
                      ? 'border-game-accent bg-game-accent/10'
                      : 'border-game-accent/20 hover:border-game-accent/45'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-game-light text-sm">{p.clientName}</p>
                      <p className="text-game-light/55 text-xs">{p.projectName}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-[10px] font-bold uppercase text-game-light/40">
                        {STATUS_LABEL[p.status] || p.status}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase ${
                          paid ? 'text-green-400' : 'text-amber-400/90'
                        }`}
                      >
                        {paid ? 'Paid' : 'Unpaid'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col gap-0.5 text-xs text-game-light/45">
                    <div className="flex justify-between gap-2">
                      <span>{euro(p.oneTimeTotal)} one-time</span>
                      {(p.status === 'active' || p.monthlyTotal > 0) && (
                        <span className={due ? 'text-red-400 font-semibold' : ''}>
                          Charge: {formatDate(p.nextChargeDate)}
                        </span>
                      )}
                    </div>
                    {p.domainRenewalDate && (
                      <div
                        className={`text-right ${
                          domainOverdue
                            ? 'text-red-400 font-semibold'
                            : domainSoon
                              ? 'text-amber-400 font-semibold'
                              : ''
                        }`}
                      >
                        Domain: {formatDate(p.domainRenewalDate)}
                      </div>
                    )}
                  </div>
                </button>
              )
            })
          )}
        </div>

        <div className="border border-game-accent/30 rounded-lg p-5 md:p-6 min-h-[320px]">
          {!selected ? (
            <p className="text-game-light/50 text-center py-16">
              Select a client to see payment, features, and reminders.
            </p>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-game-light">{selected.clientName}</h3>
                  <p className="text-game-light/60">{selected.projectName}</p>
                  <p className="text-xs text-game-light/45 mt-1">
                    {STATUS_LABEL[selected.status] || selected.status}
                    {' · '}
                    {selected.paymentStatus === 'paid_in_full' ? (
                      <span className="text-green-400 font-semibold">Paid in full</span>
                    ) : (
                      <span className="text-amber-400 font-semibold">Unpaid / quote</span>
                    )}
                  </p>
                  {selected.notes && (
                    <p className="text-game-light/45 text-sm mt-2 whitespace-pre-wrap">
                      {selected.notes}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenInCalculator?.(selected.id)}
                    className="bg-game-accent text-game-dark px-4 py-2 rounded-lg text-sm font-bold"
                  >
                    Open in Pricing
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Delete this client project?')) {
                        deleteProject({ variables: { id: selected.id } })
                      }
                    }}
                    className="border border-red-500/40 text-red-400 px-4 py-2 rounded-lg text-sm font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 text-sm">
                <div className="border border-game-accent/20 rounded-lg p-3">
                  <p className="text-game-light/45 text-xs">One-time</p>
                  <p className="font-bold text-game-accent">{euro(selected.oneTimeTotal)}</p>
                </div>
                <div className="border border-game-accent/20 rounded-lg p-3">
                  <p className="text-game-light/45 text-xs">Monthly</p>
                  <p className="font-bold text-game-light">{euro(selected.monthlyTotal)} / mo</p>
                </div>
                <div
                  className={`border rounded-lg p-3 ${
                    selected.paymentStatus === 'paid_in_full'
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-amber-500/40 bg-amber-500/5'
                  }`}
                >
                  <p className="text-game-light/45 text-xs">Payment</p>
                  <p
                    className={`font-bold ${
                      selected.paymentStatus === 'paid_in_full'
                        ? 'text-green-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {selected.paymentStatus === 'paid_in_full'
                      ? `Paid ${formatDate(selected.paidAt)}`
                      : 'Unpaid'}
                  </p>
                </div>
                <div
                  className={`border rounded-lg p-3 ${
                    isOverdue(selected.nextChargeDate)
                      ? 'border-red-500/50 bg-red-500/10'
                      : 'border-game-accent/20'
                  }`}
                >
                  <p className="text-game-light/45 text-xs">Next charge</p>
                  <p
                    className={`font-bold ${
                      isOverdue(selected.nextChargeDate) ? 'text-red-400' : 'text-game-light'
                    }`}
                  >
                    {formatDate(selected.nextChargeDate)}
                  </p>
                </div>
                <div
                  className={`border rounded-lg p-3 ${
                    isOverdue(selected.domainRenewalDate)
                      ? 'border-red-500/50 bg-red-500/10'
                      : isDueSoon(selected.domainRenewalDate, 30)
                        ? 'border-amber-500/50 bg-amber-500/10'
                        : 'border-game-accent/20'
                  }`}
                >
                  <p className="text-game-light/45 text-xs">Domain renews</p>
                  <p
                    className={`font-bold ${
                      isOverdue(selected.domainRenewalDate)
                        ? 'text-red-400'
                        : isDueSoon(selected.domainRenewalDate, 30)
                          ? 'text-amber-400'
                          : 'text-game-light'
                    }`}
                  >
                    {formatDate(selected.domainRenewalDate)}
                  </p>
                </div>
              </div>

              {selected.paymentStatus === 'paid_in_full' && selected.receiptCode && (
                <div className="border border-green-500/40 rounded-lg p-4 bg-green-500/5 text-sm">
                  <p className="font-bold text-green-400 mb-1">Receipt stamp</p>
                  <p className="font-mono text-game-light/80 text-xs">{selected.receiptCode}</p>
                  {verifyUrl && (
                    <a
                      href={verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-game-accent underline break-all"
                    >
                      {verifyUrl}
                    </a>
                  )}
                  <p className="text-game-light/45 text-xs mt-2">
                    Open in Pricing → Paid in full to print the stamped receipt.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {selected.paymentStatus !== 'paid_in_full' ? (
                  <button
                    type="button"
                    onClick={() =>
                      markPaid({
                        variables: { id: selected.id, amount: selected.oneTimeTotal },
                      })
                    }
                    className="bg-green-500/90 text-game-dark px-4 py-2 rounded-lg text-sm font-bold"
                  >
                    Mark paid in full
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Clear paid status? The old receipt code will stop verifying.'
                        )
                      ) {
                        clearPaid({ variables: { id: selected.id } })
                      }
                    }}
                    className="border border-red-500/40 text-red-400 px-4 py-2 rounded-lg text-sm font-bold"
                  >
                    Clear paid
                  </button>
                )}
                {(selected.status === 'active' || selected.monthlyTotal > 0) && (
                  <button
                    type="button"
                    onClick={() => markCharged({ variables: { id: selected.id } })}
                    className="border border-game-accent/40 text-game-accent px-4 py-2 rounded-lg text-sm font-bold hover:bg-game-accent/10"
                  >
                    Mark charged (+1 month)
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onOpenInCalculator?.(selected.id)}
                  className="border border-game-accent/40 text-game-light px-4 py-2 rounded-lg text-sm font-bold"
                >
                  {selected.paymentStatus === 'paid_in_full'
                    ? 'Print paid receipt'
                    : 'Print / send quote'}
                </button>
              </div>

              {selected.status === 'one_time' && (
                <p className="text-xs text-game-light/45 border border-game-accent/15 rounded-lg px-3 py-2">
                  One-time client — no monthly care. Keep the domain renew date so you know when to
                  renew for them.
                </p>
              )}

              <div>
                <h4 className="font-bold text-game-light mb-3">Features / scope</h4>
                <ul className="space-y-2 mb-4">
                  {(selected.features || []).length === 0 ? (
                    <li className="text-game-light/45 text-sm">No features saved yet.</li>
                  ) : (
                    selected.features.map((f) => (
                      <li
                        key={f.id}
                        className={`flex flex-wrap items-center justify-between gap-2 border rounded-lg p-3 ${
                          f.done
                            ? 'border-green-500/30 bg-green-500/5'
                            : 'border-game-accent/20'
                        }`}
                      >
                        <div className="min-w-0">
                          <p
                            className={`font-semibold text-sm ${
                              f.done ? 'text-game-light/50 line-through' : 'text-game-light'
                            }`}
                          >
                            {f.name}
                          </p>
                          <p className="text-xs text-game-light/45">
                            {f.hours}h × {euro(f.rate)}/h ={' '}
                            {Number(f.amount) === 0
                              ? 'Included — no charge'
                              : euro(f.amount)}
                            {f.doneAt ? ` · done ${formatDate(f.doneAt)}` : ''}
                          </p>
                          {f.note && (
                            <p className="text-xs text-game-light/40 mt-1">{f.note}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setDone({ variables: { id: f.id, done: !f.done } })
                          }
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                            f.done
                              ? 'border border-game-accent/30 text-game-light/60'
                              : 'bg-green-500/20 text-green-400 border border-green-500/40'
                          }`}
                        >
                          {f.done ? 'Undo' : 'Mark done'}
                        </button>
                      </li>
                    ))
                  )}
                </ul>

                <div className="border border-dashed border-game-accent/35 rounded-lg p-4 space-y-3">
                  <p className="text-sm font-bold text-game-light">Add feature when finished / scoped</p>
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_70px_80px] gap-2">
                    <input
                      type="text"
                      value={newFeature.name}
                      onChange={(e) => setNewFeature((s) => ({ ...s, name: e.target.value }))}
                      placeholder="Feature name"
                      className="px-3 py-2 bg-game-dark border border-game-accent/30 rounded-lg text-game-light"
                    />
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={newFeature.hours}
                      onChange={(e) => setNewFeature((s) => ({ ...s, hours: e.target.value }))}
                      placeholder="Hours"
                      className="px-3 py-2 bg-game-dark border border-game-accent/30 rounded-lg text-game-light"
                    />
                    <input
                      type="number"
                      min="0"
                      step="5"
                      value={newFeature.rate}
                      onChange={(e) => setNewFeature((s) => ({ ...s, rate: e.target.value }))}
                      placeholder="€/hr"
                      className="px-3 py-2 bg-game-dark border border-game-accent/30 rounded-lg text-game-light"
                    />
                  </div>
                  <input
                    type="text"
                    value={newFeature.note}
                    onChange={(e) => setNewFeature((s) => ({ ...s, note: e.target.value }))}
                    placeholder="Optional note"
                    className="w-full px-3 py-2 bg-game-dark border border-game-accent/30 rounded-lg text-game-light text-sm"
                  />
                  <button
                    type="button"
                    disabled={adding || !newFeature.name.trim()}
                    onClick={() =>
                      addFeature({
                        variables: {
                          input: {
                            projectId: selected.id,
                            name: newFeature.name.trim(),
                            hours: Number(newFeature.hours) || 0,
                            rate: Number(newFeature.rate) || 0,
                            note: newFeature.note.trim() || null,
                            done: true,
                          },
                        },
                      })
                    }
                    className="bg-game-accent text-game-dark px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-40"
                  >
                    {adding ? 'Adding…' : 'Add as done'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminClientsPanel
