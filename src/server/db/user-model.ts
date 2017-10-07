import { Document, model, Schema } from 'mongoose';
import { compare, hash } from 'bcrypt-nodejs';

import { IPost, IUser } from './interfaces';
import { postSchema } from './post-model';

const SALT_FACTOR = 13;

interface IUserModel extends IUser, Document {}

export const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    posts: [postSchema]
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  try {
    /* this is the user */
    !this.isModified('password') && next();
    this.password = await hash(this.password, SALT_FACTOR);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function(inputPassword) {
  try {
    return await compare(inputPassword, this.password);
  } catch (err) {
    console.log(err);
  }
};

const User = model<IUserModel>('User', userSchema);

export default User;
