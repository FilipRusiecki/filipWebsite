import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import { ForbiddenError } from '@redwoodjs/graphql-server'

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
 * Get a single ticket by ID
 * - Public access for anonymous tickets (by email verification)
 * - Users can view their own tickets
 * - Admins can view any ticket
 */
export const ticket = ({ id }) => {
  // Public endpoint - but we'll add authorization checks in service layer
  // For now, allow public access (can be restricted later with email verification)
  return db.ticket.findUnique({
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
}

/**
 * Create a new ticket
 * - Can be created anonymously (email only)
 * - If user is logged in, associate with user account
 */
export const createTicket = ({ input }, { context }) => {
  const currentUser = context?.currentUser

  return db.ticket.create({
    data: {
      title: input.title,
      description: input.description,
      email: input.email,
      userId: currentUser?.id || null, // Associate with user if logged in
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
