import { default as Post, postSchema } from '../../db/post-model';
import { default as User, userSchema } from '../../db/user-model';

const sanitizer = require('sanitizer');

const words = require('lodash.words');

export default {
  getAllUserPosts: async (_, { id }) => {
    const user = await User.findById(id);
    return user.posts;
  },
  getUserPost: async (_, { userId, postId }) => {
    /* get a particular post from the userId arg */
    const user = await User.findById(userId);

    return user.posts.id(postId);
  },
  createPost: async (_, { id, title, body, tags, imgUrl }) => {
    /* publish a new post */
    const user = await User.findById(id);
    const wordCount: Number = words(body).length;

    if (tags) {
      const cleanTags: [String] = tags.map(tag => {
        const trimmedTag = tag.trim();
        return sanitizer.escape(trimmedTag);
      });

      const newPost = await new Post({
        wordCount,
        imgUrl,
        title: sanitizer.escape(title.trim()),
        body: sanitizer.escape(body.trim()),
        tags: cleanTags,
        author: `${user.firstName} ${user.lastName}`
      });

      user.posts.push(newPost);
      user.save();
      return newPost;
    } else {
      const newPost = await new Post({
        wordCount,
        imgUrl,        
        title: sanitizer.escape(title.trim()),
        body: sanitizer.escape(body.trim()),
        author: `${user.firstName} ${user.lastName}`
      });

      user.posts.push(newPost);
      user.save();
      return newPost;
    }
  },
  updatePost: async (_, args) => {
    const user = await User.findById(args.userId);

    const postToUpdate = user.posts.id(args.postId);

    const updatedPost = postToUpdate.set(args);

    await user.save();

    return updatedPost;
  },
  deletePost: async (_, { userId, postId }) => {
    const user = await User.findById(userId);

    const postToDelete = user.posts.id(postId);

    await user.posts.pull(postId);
    await user.save();

    return postToDelete;
  }
};
