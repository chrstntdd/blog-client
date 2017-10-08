const typeDefs = `
scalar Date

type Auth {
  token: String!
}

type User {
  _id: String!
  email: String!
  username: String!
  password: String!
  firstName: String!
  lastName: String!
  createdAt: Date!
  posts: [Post]
}

type Post {
  _id: String!
  title: String!
  body: String!
  authorName: String!
  authorId: String!
  createdAt: Date!
  wordCount: Int
}

type Query {
  user(_id: String!): User
  users: [User]
}

type Mutation {
  signup(email: String!, username: String!, password: String!, firstName: String!, lastName: String!): Auth
  signin(email: String!, password: String!): Auth
}

schema {
  query: Query 
  mutation: Mutation
}
`;

export default typeDefs;
