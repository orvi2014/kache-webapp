import userResolver from './user';
import postResolver from './post';
import discountResolver from './discount';
import communityPostResolver from './communityPost';
import likeResolver from './like';
import followResolver from './follow';
import commentResolver from './comment';
import notificationResolver from './notification';
import message from './message';


export default [
  userResolver,
  postResolver,
  discountResolver,
  communityPostResolver,
  likeResolver,
  followResolver,
  commentResolver,
  notificationResolver,
  message,
];
