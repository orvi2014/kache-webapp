const { ObjectId } = require('mongodb');

const Query = {
    /**
     * Gets all posts
     *
     * @param {string} authUserId
     * @param {int} skip how many posts to skip
     * @param {int} limit how many posts to limit
     */
    getCommunityPosts: async (root, { skip, limit }, { CommunityPost }) => {
      const communityPostCount = await CommunityPost.find({community: ObjectId("602063ab3c4da010177f68d1")}).countDocuments();

      const communityPosts = await CommunityPost.find()
        .populate({
          path: 'post',
        })
        .populate({
          path: 'community',
          populate: { path: 'location' },
        })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: 'desc' });
      return { communityPost: communityPosts, count: communityPostCount };
    }, 
  };
  
  export default { Query };
  