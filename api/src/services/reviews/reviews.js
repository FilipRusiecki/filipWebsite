import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import crypto from 'crypto'

const MAX_NAME = 80
const MAX_BODY = 1200
const MAX_LABEL = 120

const normalizeCode = (code) =>
  String(code || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '')

const generateInviteCode = () => {
  const part = () => crypto.randomBytes(2).toString('hex').toUpperCase()
  return `FRVG-${part()}-${part()}`
}

export const businessReviews = () => {
  return db.businessReview.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
  })
}

export const adminBusinessReviews = () => {
  requireAuth({ roles: ['admin'] })
  return db.businessReview.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export const reviewInvites = () => {
  requireAuth({ roles: ['admin'] })
  return db.reviewInvite.findMany({
    orderBy: { createdAt: 'desc' },
    include: { review: true },
  })
}

export const createReviewInvite = async ({ input } = {}) => {
  requireAuth({ roles: ['admin'] })

  const label = input?.label?.trim()?.slice(0, MAX_LABEL) || null
  let code
  let attempts = 0
  do {
    code = generateInviteCode()
    attempts += 1
    // eslint-disable-next-line no-await-in-loop
    const exists = await db.reviewInvite.findUnique({ where: { code } })
    if (!exists) break
  } while (attempts < 8)

  return db.reviewInvite.create({
    data: { code, label },
    include: { review: true },
  })
}

export const createBusinessReview = async ({ input }) => {
  const code = normalizeCode(input.code)
  const name = String(input.name || '').trim().slice(0, MAX_NAME)
  const body = String(input.body || '').trim().slice(0, MAX_BODY)
  const rating = Number(input.rating)

  if (!code) {
    throw new Error('A review invite code is required.')
  }
  if (!name) {
    throw new Error('Please enter your name.')
  }
  if (!body || body.length < 10) {
    throw new Error('Please write a short review (at least 10 characters).')
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5.')
  }

  const invite = await db.reviewInvite.findUnique({
    where: { code },
    include: { review: true },
  })

  if (!invite) {
    throw new Error('That invite code is not valid.')
  }
  if (invite.used || invite.review) {
    throw new Error('That invite code has already been used.')
  }

  return db.$transaction(async (tx) => {
    const review = await tx.businessReview.create({
      data: {
        name,
        rating,
        body,
        isPublished: true,
        inviteId: invite.id,
      },
    })
    await tx.reviewInvite.update({
      where: { id: invite.id },
      data: { used: true, usedAt: new Date() },
    })
    return review
  })
}

export const setBusinessReviewPublished = ({ id, isPublished }) => {
  requireAuth({ roles: ['admin'] })
  return db.businessReview.update({
    where: { id },
    data: { isPublished: !!isPublished },
  })
}

export const deleteBusinessReview = async ({ id }) => {
  requireAuth({ roles: ['admin'] })
  const review = await db.businessReview.findUnique({ where: { id } })
  if (!review) throw new Error('Review not found.')

  return db.$transaction(async (tx) => {
    const deleted = await tx.businessReview.delete({ where: { id } })
    // Free the invite so it could theoretically be reissued — mark unused again
    await tx.reviewInvite.update({
      where: { id: review.inviteId },
      data: { used: false, usedAt: null },
    })
    return deleted
  })
}

export const deleteReviewInvite = async ({ id }) => {
  requireAuth({ roles: ['admin'] })
  const invite = await db.reviewInvite.findUnique({
    where: { id },
    include: { review: true },
  })
  if (!invite) throw new Error('Invite not found.')
  if (invite.review) {
    throw new Error('Delete the review first, or leave the used invite as history.')
  }
  return db.reviewInvite.delete({ where: { id } })
}
