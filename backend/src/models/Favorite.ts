import { Schema, model, Types } from 'mongoose';

export interface Favorite {
  _id: Types.ObjectId;

  userId: Types.ObjectId;
  recipeId: Types.ObjectId;

  createdAt: Date;
}

const FavoriteSchema = new Schema<Favorite>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },

    recipeId: {
      type: Types.ObjectId,
      ref: 'Recipe',
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

// Mỗi user chỉ favorite 1 recipe 1 lần
FavoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

export const FavoriteModel = model<Favorite>('Favorite', FavoriteSchema);
