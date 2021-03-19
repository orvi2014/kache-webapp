import userResolver from './user';
import postResolver from './post';
import discountResolver from './discount';
import communityPostResolver from './communityPost';
import likeResolver from './like';
import followResolver from './follow';
import commentResolver from './comment';
import notificationResolver from './notification';
import message from './message';
import locationResolver from './location'; 



export default [
  userResolver,
  locationResolver,
  postResolver,
  discountResolver,
  communityPostResolver,
  likeResolver,
  followResolver,
  commentResolver,
  notificationResolver,
  message, 
];
