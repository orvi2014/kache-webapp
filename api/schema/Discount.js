import { gql } from 'apollo-server-express';

/**
 * Post schema
 */
const DiscountSchema = gql`
  # ---------------------------------------------------------
  # Model Objects
  # ---------------------------------------------------------
  type Discount {
    id: ID!
    title: String
    image: File
    imagePublicId: String
    link: String
    author: User!
    creator: String!
    likes: [Like]
    comments: [Comment]
    createdAt: String
    updatedAt: String

  }

  # ---------------------------------------------------------
  # Return Payloads
  # ---------------------------------------------------------

  type DiscountPayload {
    id: ID!
    title: String
    image: String
    imagePublicId: String
    link: String
    author: UserPayload!
    creator: String
    likes: [Like]
    comments: [CommentPayload]
    createdAt: String
    updatedAt: String
  }

  type DiscountsPayload {
    discounts: [DiscountPayload]!
    count: String!
  }

  # ---------------------------------------------------------
  # Queries
  # ---------------------------------------------------------
  extend type Query {
    # Gets all posts
    getDiscounts(skip: Int, limit: Int): DiscountsPayload

    # Gets discount by id
    getDiscount(id: ID!): DiscountPayload
  }
`;

export default DiscountSchema;

