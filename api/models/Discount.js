import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Post schema that has references to User, Like and Comment schemas
 */
const discountSchema = Schema(
  {
    title: String,
    image: String,
    imagePublicId: String,
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    link: String,
    creator: {
      type: String,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    view: {
        type: Number,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Discount', discountSchema);
