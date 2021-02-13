const Query = {

    getLocations: async (root, { skip, limit }, { Location }) => {
        // Find user ids, that current user follows
        const locations =await Location.find().skip(skip)
        .limit(limit)
        .sort({ createdAt: 'desc' });
        return locations;
        // Find users that user is not following
        // const count = await Location.find().countDocuments();
        // const locations = await Location.find()
        //   .skip(skip)
        //   .limit(limit)
        //   .sort({ createdAt: 'desc' });
        // console.log(locations)
        // return { location: locations };
      },
     /**
   * Searches location by city or name
   *
   * @param {string} searchQuery
   */
  searchLocations: async (root, { searchQuery }, { Location, authUser }) => {
    // Return an empty array if searchQuery isn't presented
    try {
      if (!searchQuery) {
        return [];
      }
  
      const locations =await Location.find({
        $or: [{ city: new RegExp(searchQuery, 'i') }, { name: new RegExp(searchQuery, 'i') }],
      });
      return locations;
    } catch (error) {
      return error.message;
    }
    
  }
}
  
  export default { Query };
  