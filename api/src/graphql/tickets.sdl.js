import gql from 'graphql-tag'

export const schema = gql`
  type Ticket {
    id: Int!
    title: String!
    description: String!
    email: String
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    replies: [Reply!]!
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
    tickets: [Ticket!]! @skipAuth
    ticket(id: Int!): Ticket @skipAuth
  }

  input CreateTicketInput {
    title: String!
    description: String!
    email: String
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

  type Mutation {
    createTicket(input: CreateTicketInput!): Ticket! @skipAuth
    createReply(input: CreateReplyInput!): Reply! @skipAuth
    updateTicketStatus(input: UpdateTicketStatusInput!): Ticket! @skipAuth
  }
`
