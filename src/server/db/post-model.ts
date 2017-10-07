import { Document, model, Schema } from 'mongoose';
import { IPost } from './interfaces';

interface IPostModel extends IPost, Document {}

export const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Post = model<IPostModel>('Post', postSchema);

export default Post;
