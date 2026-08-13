import gql from 'graphql-tag'

export const schema = gql`
  type ClientProjectFeature {
    id: Int!
    projectId: Int!
    name: String!
    hours: Float!
    rate: Float!
    amount: Float!
    done: Boolean!
    doneAt: DateTime
    note: String
    createdAt: DateTime!
  }

  type ClientProject {
    id: Int!
    clientName: String!
    projectName: String!
    notes: String
    status: String!
    paymentStatus: String!
    receiptCode: String
    paidAt: DateTime
    paidAmount: Float
    nextChargeDate: DateTime
    lastChargedAt: DateTime
    domainRenewalDate: DateTime
    calcJson: String!
    oneTimeTotal: Float!
    monthlyTotal: Float!
    firstYearTotal: Float!
    createdAt: DateTime!
    updatedAt: DateTime!
    features: [ClientProjectFeature!]!
  }

  """Public view of a paid receipt — only returns data when status is paid_in_full."""
  type ClientReceiptPublic {
    valid: Boolean!
    clientName: String
    projectName: String
    paidAmount: Float
    paidAt: DateTime
    receiptCode: String
    paymentStatus: String
    message: String
  }

  type Query {
    clientProjects: [ClientProject!]! @requireAuth(roles: ["admin"])
    clientProject(id: Int!): ClientProject @requireAuth(roles: ["admin"])
    verifyClientReceipt(code: String!): ClientReceiptPublic! @skipAuth
  }

  input ClientProjectFeatureInput {
    name: String!
    hours: Float
    rate: Float
    amount: Float
    done: Boolean
    note: String
  }

  input CreateClientProjectInput {
    clientName: String!
    projectName: String!
    notes: String
    status: String
    paymentStatus: String
    nextChargeDate: DateTime
    domainRenewalDate: DateTime
    calcJson: String!
    oneTimeTotal: Float!
    monthlyTotal: Float!
    firstYearTotal: Float!
    features: [ClientProjectFeatureInput!]
  }

  input UpdateClientProjectInput {
    id: Int!
    clientName: String
    projectName: String
    notes: String
    status: String
    paymentStatus: String
    nextChargeDate: DateTime
    lastChargedAt: DateTime
    domainRenewalDate: DateTime
    calcJson: String
    oneTimeTotal: Float
    monthlyTotal: Float
    firstYearTotal: Float
    features: [ClientProjectFeatureInput!]
  }

  input AddClientProjectFeatureInput {
    projectId: Int!
    name: String!
    hours: Float
    rate: Float
    amount: Float
    note: String
    done: Boolean
  }

  type Mutation {
    createClientProject(input: CreateClientProjectInput!): ClientProject!
      @requireAuth(roles: ["admin"])
    updateClientProject(input: UpdateClientProjectInput!): ClientProject!
      @requireAuth(roles: ["admin"])
    deleteClientProject(id: Int!): ClientProject! @requireAuth(roles: ["admin"])
    addClientProjectFeature(input: AddClientProjectFeatureInput!): ClientProjectFeature!
      @requireAuth(roles: ["admin"])
    setClientProjectFeatureDone(id: Int!, done: Boolean!): ClientProjectFeature!
      @requireAuth(roles: ["admin"])
    markClientProjectCharged(id: Int!, nextChargeDate: DateTime): ClientProject!
      @requireAuth(roles: ["admin"])
    markClientProjectPaidInFull(id: Int!, amount: Float): ClientProject!
      @requireAuth(roles: ["admin"])
    clearClientProjectPaid(id: Int!): ClientProject! @requireAuth(roles: ["admin"])
  }
`
