import { db } from 'src/lib/db'

export const createReply = ({ input }) => {
  return db.reply.create({
    data: {
      ticketId: input.ticketId,
      content: input.content,
      isAdmin: input.isAdmin || false,
    },
    include: {
      ticket: {
        include: {
          replies: {
            orderBy: { createdAt: 'asc' },
          },
        },
      },
    },
  })
}
