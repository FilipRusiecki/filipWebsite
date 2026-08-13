import { randomBytes } from 'crypto'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

const includeFeatures = {
  features: { orderBy: { createdAt: 'asc' } },
}

const VALID_STATUSES = new Set([
  'quote',
  'one_time',
  'active',
  'returning',
  'past',
  'paused',
])

const mapFeatureCreate = (f) => {
  const hours = Number(f.hours) || 0
  const rate = Number(f.rate) || 0
  const amount = Number(f.amount) || hours * rate
  return {
    name: String(f.name || 'Feature').trim().slice(0, 200),
    hours,
    rate,
    amount,
    done: !!f.done,
    doneAt: f.done ? new Date() : null,
    note: f.note?.trim()?.slice(0, 500) || null,
  }
}

const normalizeStatus = (status, fallback = 'quote') => {
  const s = String(status || fallback).trim()
  // legacy mapping
  if (s === 'completed') return 'past'
  return VALID_STATUSES.has(s) ? s : fallback
}

const makeReceiptCode = () => `FRVG-${randomBytes(4).toString('hex').toUpperCase()}`

export const clientProjects = () => {
  requireAuth({ roles: ['admin'] })
  return db.clientProject.findMany({
    orderBy: [{ nextChargeDate: 'asc' }, { updatedAt: 'desc' }],
    include: includeFeatures,
  })
}

export const clientProject = ({ id }) => {
  requireAuth({ roles: ['admin'] })
  return db.clientProject.findUnique({
    where: { id },
    include: includeFeatures,
  })
}

export const verifyClientReceipt = async ({ code }) => {
  const cleaned = String(code || '')
    .trim()
    .toUpperCase()
  if (!cleaned) {
    return { valid: false, message: 'No receipt code provided.' }
  }

  const project = await db.clientProject.findUnique({
    where: { receiptCode: cleaned },
  })

  if (!project || project.paymentStatus !== 'paid_in_full') {
    return {
      valid: false,
      receiptCode: cleaned,
      message: 'This code is not a valid paid-in-full receipt.',
    }
  }

  return {
    valid: true,
    clientName: project.clientName,
    projectName: project.projectName,
    paidAmount: project.paidAmount ?? project.oneTimeTotal,
    paidAt: project.paidAt,
    receiptCode: project.receiptCode,
    paymentStatus: project.paymentStatus,
    message: 'Verified — this receipt is recorded as paid in full.',
  }
}

export const createClientProject = async ({ input }) => {
  requireAuth({ roles: ['admin'] })
  try {
    const features = (input.features || []).map(mapFeatureCreate)

    return await db.clientProject.create({
      data: {
        clientName: input.clientName.trim().slice(0, 120),
        projectName: input.projectName.trim().slice(0, 160),
        notes: input.notes?.trim()?.slice(0, 4000) || null,
        status: normalizeStatus(input.status, 'quote'),
        paymentStatus: input.paymentStatus === 'paid_in_full' ? 'paid_in_full' : 'unpaid',
        nextChargeDate: input.nextChargeDate || null,
        domainRenewalDate: input.domainRenewalDate || null,
        calcJson: input.calcJson,
        oneTimeTotal: Number(input.oneTimeTotal) || 0,
        monthlyTotal: Number(input.monthlyTotal) || 0,
        firstYearTotal: Number(input.firstYearTotal) || 0,
        features: features.length ? { create: features } : undefined,
      },
      include: includeFeatures,
    })
  } catch (e) {
    console.error('createClientProject failed:', e)
    throw new Error(e?.message || 'Failed to save client project.')
  }
}

export const updateClientProject = async ({ input }) => {
  requireAuth({ roles: ['admin'] })
  const { id, features, ...rest } = input

  const data = {}
  if (rest.clientName != null) data.clientName = rest.clientName.trim().slice(0, 120)
  if (rest.projectName != null) data.projectName = rest.projectName.trim().slice(0, 160)
  if (rest.notes !== undefined) data.notes = rest.notes?.trim()?.slice(0, 4000) || null
  if (rest.status != null) data.status = normalizeStatus(rest.status)
  if (rest.paymentStatus != null) {
    data.paymentStatus =
      rest.paymentStatus === 'paid_in_full' ? 'paid_in_full' : 'unpaid'
  }
  if (rest.nextChargeDate !== undefined) data.nextChargeDate = rest.nextChargeDate
  if (rest.lastChargedAt !== undefined) data.lastChargedAt = rest.lastChargedAt
  if (rest.domainRenewalDate !== undefined) data.domainRenewalDate = rest.domainRenewalDate
  if (rest.calcJson != null) data.calcJson = rest.calcJson
  if (rest.oneTimeTotal != null) data.oneTimeTotal = Number(rest.oneTimeTotal) || 0
  if (rest.monthlyTotal != null) data.monthlyTotal = Number(rest.monthlyTotal) || 0
  if (rest.firstYearTotal != null) data.firstYearTotal = Number(rest.firstYearTotal) || 0

  if (features) {
    await db.clientProjectFeature.deleteMany({ where: { projectId: id } })
    data.features = { create: features.map(mapFeatureCreate) }
  }

  return db.clientProject.update({
    where: { id },
    data,
    include: includeFeatures,
  })
}

export const deleteClientProject = ({ id }) => {
  requireAuth({ roles: ['admin'] })
  return db.clientProject.delete({
    where: { id },
    include: includeFeatures,
  })
}

export const addClientProjectFeature = async ({ input }) => {
  requireAuth({ roles: ['admin'] })
  const hours = Number(input.hours) || 0
  const rate = Number(input.rate) || 0
  const amount = Number(input.amount) || hours * rate
  const done = !!input.done

  return db.clientProjectFeature.create({
    data: {
      projectId: input.projectId,
      name: String(input.name || 'Feature').trim().slice(0, 200),
      hours,
      rate,
      amount,
      done,
      doneAt: done ? new Date() : null,
      note: input.note?.trim()?.slice(0, 500) || null,
    },
  })
}

export const setClientProjectFeatureDone = ({ id, done }) => {
  requireAuth({ roles: ['admin'] })
  return db.clientProjectFeature.update({
    where: { id },
    data: {
      done: !!done,
      doneAt: done ? new Date() : null,
    },
  })
}

export const markClientProjectCharged = ({ id, nextChargeDate }) => {
  requireAuth({ roles: ['admin'] })
  const now = new Date()
  let next = nextChargeDate || null
  if (!next) {
    next = new Date(now)
    next.setMonth(next.getMonth() + 1)
  }
  return db.clientProject.update({
    where: { id },
    data: {
      lastChargedAt: now,
      nextChargeDate: next,
    },
    include: includeFeatures,
  })
}

export const markClientProjectPaidInFull = async ({ id, amount }) => {
  requireAuth({ roles: ['admin'] })
  const existing = await db.clientProject.findUnique({ where: { id } })
  if (!existing) throw new Error('Client project not found')

  const paidAmount =
    amount != null && !Number.isNaN(Number(amount))
      ? Number(amount)
      : Number(existing.oneTimeTotal) || 0

  let receiptCode = existing.receiptCode
  if (!receiptCode) {
    for (let i = 0; i < 5; i++) {
      const candidate = makeReceiptCode()
      const clash = await db.clientProject.findUnique({ where: { receiptCode: candidate } })
      if (!clash) {
        receiptCode = candidate
        break
      }
    }
    if (!receiptCode) receiptCode = makeReceiptCode()
  }

  return db.clientProject.update({
    where: { id },
    data: {
      paymentStatus: 'paid_in_full',
      paidAt: existing.paidAt || new Date(),
      paidAmount,
      receiptCode,
      // If still a quote, promote to one_time by default after payment
      status: existing.status === 'quote' ? 'one_time' : existing.status,
    },
    include: includeFeatures,
  })
}

export const clearClientProjectPaid = ({ id }) => {
  requireAuth({ roles: ['admin'] })
  return db.clientProject.update({
    where: { id },
    data: {
      paymentStatus: 'unpaid',
      paidAt: null,
      paidAmount: null,
      // keep receiptCode so old forged docs with that code still fail if we clear…
      // Actually: clear code so old printed codes no longer verify
      receiptCode: null,
    },
    include: includeFeatures,
  })
}
