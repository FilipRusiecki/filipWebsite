import gql from 'graphql-tag'

export const schema = gql`
  type Ticket {
    id: Int!
    title: String!
    description: String!
    email: String
    userId: Int
    user: User
    ticketType: String!
    status: String!
    gameVersion: String
    platform: String
    stepsToReproduce: String
    expectedBehavior: String
    actualBehavior: String
    frequency: String
    severity: String
    createdAt: DateTime!
    updatedAt: DateTime!
    replies: [Reply!]!
  }

  type User {
    id: Int!
    email: String!
    role: String!
  }

  type Reply {
    id: Int!
    ticketId: Int!
    ticket: Ticket!
    content: String!
    isAdmin: Boolean!
    createdAt: DateTime!
  }

  type Query {
    tickets: [Ticket!]! @requireAuth(roles: ["admin"])
    # Individual ticket viewing is public (users can view their own ticket by ID)
    # But we'll add email verification in the service layer
    ticket(id: Int!): Ticket @skipAuth
  }

  input CreateTicketInput {
    title: String!
    description: String!
    email: String
    ticketType: String
    gameVersion: String
    platform: String
    stepsToReproduce: String
    expectedBehavior: String
    actualBehavior: String
    frequency: String
    severity: String
  }

  input CreateReplyInput {
    ticketId: Int!
    content: String!
    isAdmin: Boolean
  }

  input UpdateTicketStatusInput {
    id: Int!
    status: String!
  }

  input AdminReplyInput {
    ticketId: Int!
    content: String!
  }

  type Mutation {
    createTicket(input: CreateTicketInput!): Ticket! @skipAuth
    createReply(input: CreateReplyInput!): Reply! @skipAuth
    updateTicketStatus(input: UpdateTicketStatusInput!): Ticket! @requireAuth(roles: ["admin"])
    adminReply(input: AdminReplyInput!): Reply! @requireAuth(roles: ["admin"])
  }
`
