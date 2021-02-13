import { gql } from 'apollo-server-express';

/**
 * Post schema
 */
const CommunityPostSchema = gql`
  # ---------------------------------------------------------
  # Model Objects
  # ---------------------------------------------------------
  type Community {
    id: ID!
    name: String
    location: [Location]
  }
  type CommunityPosts {
    community: CommunityPayload
    post: PostPayload
  }

  # ---------------------------------------------------------
  # Return Payloads
  # ---------------------------------------------------------
  type CommunityPayload {
    id: ID!
    name: String
    location: LocationPayload
  }
  type CommunityPostPayload {
    id: ID!
    community: [CommunityPayload]
    post: [PostPayload]
  }

  type CommunityPostsPayload {
    communityPosts: [CommunityPostPayload]!
    count: String!
  }



  # ---------------------------------------------------------
  # Queries
  # ---------------------------------------------------------
  extend type Query {
    # Gets all posts
    getCommunityPosts(skip: Int, limit: Int): CommunityPostsPayload
  }
`;

export default CommunityPostSchema;

