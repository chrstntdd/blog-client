import { Document, model, Schema } from 'mongoose';
import { compare, hash, genSalt } from 'bcrypt';
import { sign } from 'jsonwebtoken';
require('dotenv').config();

import { IPost, IUser } from './interfaces';
import { postSchema } from './post-model';

const SALT_FACTOR = 13;
const JWT_SECRET = process.env.JWT_SECRET;

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
    created: {
      type: Date,
      default: Date.now
    },
    posts: [postSchema]
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  try {
    /* this is the user object */
    !this.isModified('password') && next();
    const hashedPassword = await hash(this.password, SALT_FACTOR);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

/*
 * Util function to check if the users password matches the hashed password in the db 
 * Returns true if the input password matches the hashed password and false otherwise
 */
userSchema.methods.authUser = async function(
  password: string
): Promise<Boolean> {
  try {
    return await compare(password, this.password);
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.createToken = (id: string): string => {
  return sign({ id }, JWT_SECRET, { expiresIn: '2h' });
};

const User = model<IUserModel>('User', userSchema);

export default User;
