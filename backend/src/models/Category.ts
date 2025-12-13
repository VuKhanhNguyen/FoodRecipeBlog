import { Schema, model, Types } from 'mongoose';

export interface Category {
  _id: Types.ObjectId;

  name: string;
  slug: string;
  description?: string;
  image?: string;

  createdAt: Date;
}

const CategorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

CategorySchema.index({ slug: 1 });

export const CategoryModel = model<Category>('Category', CategorySchema);
