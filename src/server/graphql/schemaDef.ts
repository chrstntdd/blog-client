const typeDefs = `
scalar Date

type Auth {
  token: String!
}

type User {
  _id: ID!
  username: String!
  password: String!
  email: String!
  firstName: String!
  lastName: String!
  created: Date!
  posts: [Post]
}

type Post {
  _id: ID!
  title: String!
  body: String!
  author: String!
  wordCount: Int
  published: Date!
  edited: Date
  tags: [String]
}

type Query {
  user(_id: String!): User
  users: [User]

  getAllUserPosts(id: ID!): [Post]
  getUserPost(userId: ID!, postId: ID!): Post
  
}

type Mutation {
  signup(email: String!, username: String!, password: String!, firstName: String!, lastName: String!): Auth! 
  signin(email: String!, password: String!): Auth!
  updateUser(id: ID!, username: String, email: String, firstName: String, lastName: String): User!
  deleteUser(id: ID!): User!

  createPost(id: ID!, title: String!, body: String, tags: [String]): Post!
  updatePost(userId: ID!, postId: ID!, title: String, body: String, tags: [String]): Post!
  deletePost(userId: ID!, postId: ID!): Post!
}

schema {
  query: Query 
  mutation: Mutation
}
`;

export default typeDefs;
