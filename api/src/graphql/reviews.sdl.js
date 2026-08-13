import gql from 'graphql-tag'

export const schema = gql`
  type ReviewInvite {
    id: Int!
    code: String!
    label: String
    used: Boolean!
    usedAt: DateTime
    createdAt: DateTime!
    review: BusinessReview
  }

  type BusinessReview {
    id: Int!
    name: String!
    rating: Int!
    body: String!
    isPublished: Boolean!
    inviteId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    """Published reviews for the business page"""
    businessReviews: [BusinessReview!]! @skipAuth
    """All reviews — admin"""
    adminBusinessReviews: [BusinessReview!]! @requireAuth(roles: ["admin"])
    """Invite codes — admin"""
    reviewInvites: [ReviewInvite!]! @requireAuth(roles: ["admin"])
  }

  input CreateReviewInviteInput {
    label: String
  }

  input CreateBusinessReviewInput {
    code: String!
    name: String!
    rating: Int!
    body: String!
  }

  type Mutation {
    createReviewInvite(input: CreateReviewInviteInput): ReviewInvite!
      @requireAuth(roles: ["admin"])
    createBusinessReview(input: CreateBusinessReviewInput!): BusinessReview! @skipAuth
    setBusinessReviewPublished(id: Int!, isPublished: Boolean!): BusinessReview!
      @requireAuth(roles: ["admin"])
    deleteBusinessReview(id: Int!): BusinessReview! @requireAuth(roles: ["admin"])
    deleteReviewInvite(id: Int!): ReviewInvite! @requireAuth(roles: ["admin"])
  }
`
