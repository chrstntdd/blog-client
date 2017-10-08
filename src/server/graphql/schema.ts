// import {
//   GraphQLList,
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLNonNull,
//   GraphQLString,
//   GraphQLInt,
//   GraphQLID,
//   GraphQLFloat
// } from 'graphql';

// import UserModel from '../db/user-model';
// import PostModel from '../db/post-model';

// const Post = new GraphQLObjectType({
//   name: 'Post',
//   description: 'Represents a blog post',
//   fields: () => ({
//     id: { type: GraphQLInt },
//     title: { type: GraphQLString },
//     url: { type: GraphQLString },
//     body: { type: GraphQLString },
//     votes: { type: GraphQLInt },
//     author: {
//       type: User,
//       resolve(post) {
//         return db.getUserById(post.author_id);
//       }
//     },
//     published_at: {
//       type: GraphQLFloat,
//       resolve(post) {
//         return new Date(post.published_at).getTime();
//       }
//     }
//   })
// });

// const User = new GraphQLObjectType({
//   name: 'User',
//   description: 'Represents the type of an author of a blog post or a comment',
//   fields: {
//     id: { type: GraphQLID },
//     firstName: { type: GraphQLString },
//     lastName: { type: GraphQLString },
//     username: { type: GraphQLString },
//     password: { type: GraphQLString },
//     email: { type: GraphQLString },
//     posts: {
//       type: new GraphQLList(PostType),
//       resolve() {
//         UserModel.find({authorId : id})
//       }
//     }
//     }
//   }
// });

// const Query = new GraphQLObjectType({
//   name: 'BlogSchema',
//   description: 'The root of all our queries',
//   fields: () => ({
//     posts: {
//       type: new GraphQLList(Post),
//       description: 'List of posts in the blog',
//       args: {
//         limit: { type: GraphQLInt, description: 'Limit the posts returned' }
//       },
//       resolve(_root, args) {
//         return db.getPosts(args);
//       }
//     },

//     post: {
//       type: Post,
//       description: 'Retrieve post by id',
//       args: {
//         id: { type: new GraphQLNonNull(GraphQLInt) }
//       },
//       resolve(_root, { id, title }) {
//         return db.getPostById(id);
//       }
//     },

//     users: {
//       type: new GraphQLList(User),
//       description: 'List available users in the blog',
//       resolve() {
//         return db.getUsers();
//       }
//     },

//     user: {
//       type: User,
//       description: 'Retrieve user by id',
//       args: {
//         id: { type: new GraphQLNonNull(GraphQLInt) }
//       },
//       resolve(source, { id }) {
//         return db.getUserById(id);
//       }
//     }
//   })
// });

// const Mutation = new GraphQLObjectType({
//   name: 'BlogMutations',
//   fields: {
//     createPost: {
//       type: Post,
//       description: 'Create a new blog post',
//       args: {
//         title: { type: new GraphQLNonNull(GraphQLString) },
//         url: { type: new GraphQLNonNull(GraphQLString) },
//         body: { type: GraphQLString },
//         author: {
//           type: new GraphQLNonNull(GraphQLInt),
//           description: 'Id of the author'
//         }
//       },
//       resolve(source, args) {
//         const post = db.createPost(args);
//         return post;
//       }
//     }
//   }
// });

// const schema = new GraphQLSchema({
//   query: Query,
//   mutation: Mutation
// });

// export default schema;
