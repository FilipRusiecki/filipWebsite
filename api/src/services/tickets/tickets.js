import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { context } from '@redwoodjs/graphql-server'
import crypto from 'crypto'

/**
 * Get all tickets - ADMIN ONLY
 * Regular users cannot access this endpoint
 */
export const tickets = () => {
  // This is already protected by @requireAuth(roles: ["admin"]) in SDL
  // But we add an extra check here for defense in depth
  const currentUser = requireAuth({ roles: ['admin'] })
  
  return db.ticket.findMany({
    orderBy: { createdAt: 'desc' },
    include: { 
      replies: { orderBy: { createdAt: 'asc' } },
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  })
}

/**
 * Get a single ticket by ID.
 * Allowed only if:
 * - currentUser is admin, or
 * - currentUser.id === ticket.userId (owner), or
 * - token argument matches ticket.viewToken (link-based access).
 * Returns ticket without viewToken for privacy.
 */
export const ticket = async ({ id, token }) => {
  const currentUser = context?.currentUser
  const row = await db.ticket.findUnique({
    where: { id },
    include: {
      replies: { orderBy: { createdAt: 'asc' } },
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  })
  if (!row) return null

  const isAdmin = currentUser?.role === 'admin'
  const isOwner = currentUser?.id != null && row.userId === currentUser.id
  const hasValidToken = token && row.viewToken && token === row.viewToken

  if (!isAdmin && !isOwner && !hasValidToken) return null

  const { viewToken: _, ...ticket } = row
  return ticket
}

/**
 * Create a new ticket
 * - Can be created anonymously (email only)
 * - If user is logged in, associate with user account
 * - Sets viewToken so the creator can share a link; only that link grants access
 */
export const createTicket = ({ input }) => {
  const currentUser = context?.currentUser
  const viewToken = crypto.randomBytes(24).toString('hex')

  return db.ticket.create({
    data: {
      title: input.title,
      description: input.description,
      email: input.email,
      userId: currentUser?.id || null,
      viewToken,
      ticketType: input.ticketType || 'support',
      status: 'open',
      gameVersion: input.gameVersion,
      platform: input.platform,
      stepsToReproduce: input.stepsToReproduce,
      expectedBehavior: input.expectedBehavior,
      actualBehavior: input.actualBehavior,
      frequency: input.frequency,
      severity: input.severity,
    },
    include: {
      replies: true,
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  })
}

/**
 * Update ticket status - ADMIN ONLY
 */
export const updateTicketStatus = ({ input }) => {
  // This is already protected by @requireAuth(roles: ["admin"]) in SDL
  // But we add an extra check here for defense in depth
  const currentUser = requireAuth({ roles: ['admin'] })

  return db.ticket.update({
    where: { id: input.id },
    data: { status: input.status },
    include: { 
      replies: { orderBy: { createdAt: 'asc' } },
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  })
}

/**
 * Admin reply to a ticket - ADMIN ONLY
 */
export const adminReply = ({ input }) => {
  // This is already protected by @requireAuth(roles: ["admin"]) in SDL
  // But we add an extra check here for defense in depth
  const currentUser = requireAuth({ roles: ['admin'] })

  return db.reply.create({
    data: {
      ticketId: input.ticketId,
      content: input.content,
      isAdmin: true,
    },
    include: {
      ticket: {
        include: {
          replies: { orderBy: { createdAt: 'asc' } },
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      },
    },
  })
}
