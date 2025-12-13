import { Schema, model, Types } from 'mongoose';

export interface IRecipe {
  _id: Types.ObjectId;

  title: string;
  description?: string;

  ingredients: string[];
  instructions: string[];

  prepTime: number;
  cookTime: number;
  servings: number;

  difficulty: 'easy' | 'medium' | 'hard';

  category: Types.ObjectId;
  author: Types.ObjectId;

  images: string[];
  tags: string[];

  views: number;
  likes: number;

  createdAt?: Date;
  updatedAt?: Date;
}


const RecipeSchema = new Schema<IRecipe>(
  {
    title: { type: String, required: true, trim: true },

    description: {
      type: String,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    prepTime: {
      type: Number,
      required: true,
      min: 0,
    },
    cookTime: {
      type: Number,
      required: true,
      min: 0,
    },
    servings: {
      type: Number,
      required: true,
      min: 1,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },

    category: {
      type: Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

RecipeSchema.index({ title: 'text', tags: 'text' });
RecipeSchema.index({ category: 1 });

export const RecipeModel = model<IRecipe>('Recipe', RecipeSchema);