export interface IPost {
  title: string;
  body: string;
  author: string;
}

export interface IUser {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  posts: [IPost];
}
