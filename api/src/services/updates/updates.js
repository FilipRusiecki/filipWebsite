import { db } from 'src/lib/db'

export const updates = () => {
  try {
    return db.update.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching updates:', error)
    // Return empty array instead of throwing to prevent GraphQL errors
    return []
  }
}

export const update = ({ id }) => {
  return db.update.findUnique({
    where: { id },
  })
}

export const recentUpdates = ({ limit = 5 }) => {
  try {
    return db.update.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      take: limit || 5,
    })
  } catch (error) {
    console.error('Error fetching recent updates:', error)
    // Return empty array instead of throwing to prevent GraphQL errors
    return []
  }
}

export const createUpdate = ({ input }) => {
  return db.update.create({
    data: {
      title: input.title,
      version: input.version,
      content: input.content,
      summary: input.summary,
      isPublished: input.isPublished ?? false,
    },
  })
}

export const updateUpdate = ({ input }) => {
  return db.update.update({
    where: { id: input.id },
    data: {
      title: input.title,
      version: input.version,
      content: input.content,
      summary: input.summary,
      isPublished: input.isPublished,
    },
  })
}

export const deleteUpdate = ({ id }) => {
  return db.update.delete({
    where: { id },
  })
}
