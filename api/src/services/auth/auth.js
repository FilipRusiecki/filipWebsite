/**
 * Returns the current user from the GraphQL context when the request has a valid session.
 * Used by the web AuthProvider to get full user (id, email, role) after page load/refresh.
 */
export const currentUser = (_args, { context }) => {
  return context?.currentUser ?? null
}
