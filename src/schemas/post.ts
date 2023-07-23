import mongoose, { Schema } from 'mongoose';

export const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('Post', postSchema);

export default Post;
