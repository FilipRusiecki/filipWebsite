import gql from 'graphql-tag'

// currentUser returns the logged-in user (id, email, role) or null. Used by the web
// AuthProvider when it has a session id from getToken/getUserMetadata but needs full user.
export const schema = gql`
  type Query {
    currentUser: User @skipAuth
  }
`
