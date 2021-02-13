import { gql } from 'apollo-server-express';

/**
 * User schema
 */
const LocationSchema = gql`
  # ---------------------------------------------------------
  # Model Objects
  # ---------------------------------------------------------
  type Location {
    id: ID!
    name: String
    city: String

  }

  # ---------------------------------------------------------
  # Return Payloads
  # ---------------------------------------------------------
  type LocationPayload {
    id: ID!
    name: String!
    city: String!

  }
  type LocationsPayload {
      locations: [LocationPayload]!
      count: String!
  }

  # ---------------------------------------------------------
  # Queries
  # ---------------------------------------------------------
  extend type Query {
    # Searches users by username or fullName
    searchLocations(searchQuery: String!): [LocationPayload]
    getLocations(skip: Int, limit: Int): [LocationPayload]
  }
`;

export default LocationSchema;
