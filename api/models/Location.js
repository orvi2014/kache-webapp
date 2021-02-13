import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Post schema that has references to User, Like and Comment schemas
 */
const locationSchema = Schema(
  {
    name: String,
    city: String,
    version: {
        type: Number,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Location', locationSchema);
