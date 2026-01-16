import { db } from 'src/lib/db'

export const tickets = () => {
  return db.ticket.findMany({
    orderBy: { createdAt: 'desc' },
    include: { replies: { orderBy: { createdAt: 'asc' } } },
  })
}

export const ticket = ({ id }) => {
  return db.ticket.findUnique({
    where: { id },
    include: { replies: { orderBy: { createdAt: 'asc' } } },
  })
}

export const createTicket = ({ input }) => {
  return db.ticket.create({
    data: {
      title: input.title,
      description: input.description,
      email: input.email,
      status: 'open',
    },
    include: { replies: true },
  })
}

export const updateTicketStatus = ({ input }) => {
  return db.ticket.update({
    where: { id: input.id },
    data: { status: input.status },
    include: { replies: { orderBy: { createdAt: 'asc' } } },
  })
}
