export interface IPost {
  title: string;
  body: string;
  authorName: string;
  authorId: string;
  wordCount: number;
  createdAt: Date;
}

export interface IUser {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  posts: [IPost];
  authUser(password: string);
  createToken(id: string);
}
