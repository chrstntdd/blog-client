export interface IPost {
  title: string;
  body: string;
  author: string;
  wordCount: number;
  published: Date;
  edited: Date;
  tags: [String];
}

export interface IUser {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  created: Date;
  posts: [IPost];
  authUser(password: string);
  createToken(id: string);
}
