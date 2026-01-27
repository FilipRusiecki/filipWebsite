import { context } from '@redwoodjs/graphql-server'
import { db } from './db'
import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

/**
 * The session object sent in as the first argument to getCurrentUser() will
 * have a single key `id` containing the unique identifier of the logged in user
 * (whatever field you set as `authFields.id` in your auth function config).
 * You'll need to update the call to `db` below if you use a different model name
 * or unique field name, for example:
 *
 *   return await db.user.findUnique({ where: { email: session.id } })
 *
 * !!! IMPORTANT !!!
 * Because you're using dbAuth, you'll need to use the `db` export from `src/lib/db.js`
 * instead of importing `db` directly from `@prisma/client` since dbAuth needs to use
 * the same instance of Prisma Client that Redwood uses internally.
 */
export const getCurrentUser = async (session) => {
  // No session = not logged in. Return null so unauthenticated GraphQL requests
  // (home page, public queries, currentUser from auth) don't crash with 500.
  // Resolvers that need auth use @requireAuth and will throw when currentUser is null.
  if (!session || !session.id) {
    return null
  }

  return await db.user.findUnique({
    where: { id: session.id },
    select: { id: true, email: true, role: true },
  })
}

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = () => {
  return !!context?.currentUser
}

/**
 * When checking role membership, roles can be a single value, a list, or none.
 * You can use Prisma enums too (if you're using them for roles)
 *
 * @returns {boolean} - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 *
 * @example
 *
 * ```js
 * roles('admin')
 * roles(['admin', 'author'])
 * roles() // true if authenticated
 * ```
 */
export const hasRole = ({ roles }) => {
  if (!isAuthenticated()) {
    return false
  }

  const currentUserRoles = context?.currentUser?.role ? [context.currentUser.role] : []

  if (typeof roles === 'string') {
    return currentUserRoles.includes(roles)
  }

  if (Array.isArray(roles)) {
    return roles.some((role) => currentUserRoles.includes(role))
  }

  return false
}

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @returns {boolean} - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {AuthenticationError} - If the currentUser is not authenticated
 * @throws {ForbiddenError} - If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 *
 * @example
 *
 * ```js
 * requireAuth() // require any authenticated user
 * requireAuth({ roles: 'admin' }) // require admin role
 * requireAuth({ roles: ['admin', 'author'] }) // require admin or author role
 * ```
 */
export const requireAuth = ({ roles } = {}) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (roles && !hasRole({ roles })) {
    throw new ForbiddenError("You don't have access to do that.")
  }

  return context?.currentUser
}
