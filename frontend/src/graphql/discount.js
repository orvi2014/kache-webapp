import { gql } from '@apollo/client';

/**
 * Records to select from post comments
 */
export const postCommentsPayload = `
  comments {
    id
    comment
    author {
      id
      username
      fullName
      image
    }
  }
`;

/**
 * Records to select from post author
 */
export const postAuthorPayload = `
  author {
    id
    username
    fullName
    image
    following {
      id
      user
    }
    followers {
      id
      user
    }
    notifications {
      id
      author {
        id
        username
      }
      follow {
        id
      }
      like {
        id
      }
      comment {
        id
      }
    }
  }
`;

/**
 * Records to select from post likes
 */
export const postLikesPayload = `
  likes {
    id
    user
    post
  }
`;

export const GET_DISCOUNTS = gql`
query($skip: Int, $limit: Int) {
  getDiscounts(skip: $skip, limit: $limit) {
    count
    discounts {
      id
      title
      image
      link
      creator
      createdAt
      imagePublicId
    }
  }
}
`;
