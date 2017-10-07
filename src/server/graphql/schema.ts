import {
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from 'graphql';

import UserModel from '../db/user-model';
import PostModel from '../db/post-model';

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'Represents a blog post',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    body: { type: GraphQLString },
    votes: { type: GraphQLInt },
    author: {
      type: User,
      resolve: function(post) {
        return db.getUserById(post.author_id);
      }
    },
    published_at: {
      type: GraphQLFloat,
      resolve: function(post) {
        return new Date(post.published_at).getTime();
      }
    }
  })
});

const User = new GraphQLObjectType({
  name: 'User',
  description: 'Represents the type of an author of a blog post or a comment',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    joined_at: {
      type: GraphQLFloat,
      resolve: function(post) {
        return new Date(post.joined_at).getTime();
      }
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'BlogSchema',
  description: 'The root of all our queries',
  fields: () => ({
    posts: {
      type: new GraphQLList(Post),
      description: 'List of posts in the blog',
      args: {
        limit: { type: GraphQLInt, description: 'Limit the posts returned' }
      },
      resolve: function(_root, args) {
        return db.getPosts(args);
      }
    },

    post: {
      type: Post,
      description: 'Retrieve post by id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: function(_root, { id, title }) {
        return db.getPostById(id);
      }
    },

    users: {
      type: new GraphQLList(User),
      description: 'List available users in the blog',
      resolve: function() {
        return db.getUsers();
      }
    },

    user: {
      type: User,
      description: 'Retrieve user by id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: function(source, { id }) {
        return db.getUserById(id);
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'BlogMutations',
  fields: {
    createPost: {
      type: Post,
      description: 'Create a new blog post',
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: GraphQLString },
        author: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Id of the author'
        }
      },
      resolve: function(source, args) {
        let post = db.createPost(args);
        return post;
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default schema;
