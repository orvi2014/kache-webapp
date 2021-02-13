import { gql } from 'apollo-server-express';

/**
 * Post schema
 */
const AlertSchema = gql`
  # ---------------------------------------------------------
  # Model Objects
  # ---------------------------------------------------------
  type Alert {
    id: ID!
    title: String
    image: File
    imagePublicId: String
    author: User!
    likes: [Like]
    comments: [Comment]
    createdAt: String
    updatedAt: String
  }

  # ---------------------------------------------------------
  # Return Payloads
  # ---------------------------------------------------------

  type AlertPayload {
    id: ID!
    title: String
    image: String
    imagePublicId: String
    author: UserPayload!
    likes: [Like]
    comments: [CommentPayload]
    createdAt: String
    updatedAt: String
  }

  type AlertsPayload {
    alerts: [AlertPayload]!
    count: String!
  }

  # ---------------------------------------------------------
  # Queries
  # ---------------------------------------------------------
  extend type Query {
    # Gets all posts
    getAlerts(skip: Int, limit: Int): AlertsPayload
  }
`;

export default AlertSchema;

