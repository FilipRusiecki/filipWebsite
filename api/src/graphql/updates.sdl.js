import gql from 'graphql-tag'

export const schema = gql`
  type Update {
    id: Int!
    title: String!
    version: String
    content: String!
    summary: String
    isPublished: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    updates: [Update!]! @skipAuth
    update(id: Int!): Update @skipAuth
    recentUpdates(limit: Int): [Update!]! @skipAuth
  }

  input CreateUpdateInput {
    title: String!
    version: String
    content: String!
    summary: String
    isPublished: Boolean
  }

  input UpdateUpdateInput {
    id: Int!
    title: String
    version: String
    content: String
    summary: String
    isPublished: Boolean
  }

  type Mutation {
    createUpdate(input: CreateUpdateInput!): Update! @skipAuth
    updateUpdate(input: UpdateUpdateInput!): Update! @skipAuth
    deleteUpdate(id: Int!): Update! @skipAuth
  }
`
