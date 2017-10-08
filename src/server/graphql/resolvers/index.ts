// import PostResolvers from './post';
import UserResolvers from './user';

export default {
    Query: {
      // getMessage: MessageResolvers.getMessage,
      // getMessages: MessageResolvers.getMessages,
      users: UserResolvers.getAllUsers,
      user: UserResolvers.getUser
    },
    Mutation: {
      // createMessage: MessageResolvers.createMessage,
      // deleteMessage: MessageResolvers.deleteMessage,
      signup: UserResolvers.signup,
      signin: UserResolvers.signin,
    }
  };