import { default as User, userSchema } from '../../db/user-model';
import { sign } from 'jsonwebtoken';

export default {
  signup: async (_, { email, username, password, firstName, lastName }) => {
    const newUser = await new User({
      email,
      username,
      password,
      firstName,
      lastName
    }).save();

    const token = newUser.createToken(newUser._id);

    return {
      token
    };
  },
  signin: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('There is no user with that email');
    } else if (!user.authUser(password)) {
      throw new Error('Incorrect email or password');
    } else {
      const token = user.createToken(user._id);
      return {
        token
      };
    }
  },

  getAllUsers: async () => {
    const allUsers = await User.find();
    if (!allUsers) {
      throw new Error('There are no users');
    } else {
      return allUsers;
    }
  },

  getUser: async (_, { id }) => {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("That user doesn't exist, fam");
    } else {
      return user;
    }
  },

  updateUser: async (_, args) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        args.id,
        { $set: args },
        { new: true }
      );

      return updatedUser;
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteUser: async (_, { id }) => {
    try {
      const userToDelete = await User.findByIdAndRemove(id);
      return userToDelete;
    } catch (err) {
      throw new Error(err);
    }
  }
};
