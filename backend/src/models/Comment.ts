import { Schema, model, Types } from 'mongoose';

export interface IComment {
  _id: Types.ObjectId;

  recipeId: Types.ObjectId;
  userId: Types.ObjectId;

  content: string;
  rating?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    recipeId: {
      type: Types.ObjectId,
      ref: 'Recipe',
      required: true,
    },

    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Index để load comment nhanh theo recipe
CommentSchema.index({ recipeId: 1, createdAt: -1 });

export const CommentModel = model<IComment>('Comment', CommentSchema);
