import { Schema, model, Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;

  username: string;
  email: string;
  password: string;

  fullName?: string;
  avatar?: string;

  role: 'admin' | 'user';

  createdAt?: Date;
  updatedAt?: Date;
}


const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    avatar: {
      type: String,
    },

    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Index quan trọng
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

export const UserModel = model<IUser>('User', UserSchema);