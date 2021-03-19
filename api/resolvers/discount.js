const Query = {
  /**
   * Gets all posts
   *
   * @param {string} authUserId
   * @param {int} skip how many posts to skip
   * @param {int} limit how many posts to limit
   */
  getDiscounts: async (root, { skip, limit }, { Discount }) => {
    const discountsCount = await Discount.find().countDocuments();
    const allDiscounts = await Discount.find();
      // .populate({
      //   path: 'author',
      //   // populate: [
      //   //   { path: 'following' },
      //   //   { path: 'followers' },
      //   //   {
      //   //     path: 'notifications',
      //   //     populate: [{ path: 'author' }, { path: 'follow' }, { path: 'like' }, { path: 'comment' }],
      //   //   },
      //   // ],
      // })
      // .populate('likes')
      // // .populate({
      // //   path: 'comments',
      // //   options: { sort: { createdAt: 'desc' } },
      // //   populate: { path: 'author' },
      // // })
      // .skip(skip)
      // .limit(limit)
      // .sort({ createdAt: 'desc' });
    return { discounts: allDiscounts, count: discountsCount };
  },
  /**
   * Gets discount by id
   *
   * @param {string} id
   */
  getDiscount: async (root, { id }, { Discount }) => {
    const discount = await Discount.findById(id)
      .populate({
        path: 'author',
        populate: [
          { path: 'following' },
          { path: 'followers' },
        ],
      })
      .populate('likes')
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } },
        populate: { path: 'author' },
      });
    return discount;
  },
};

export default { Query };
