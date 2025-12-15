import { Schema, model, Types } from "mongoose";

export interface IRecipe {
  _id: Types.ObjectId;

  title: string;
  description: string;

  ingredients?: string[];
  instructions?: string[];

  prepTime?: number;
  cookTime?: number;
  servings?: number;

  difficulty?: "easy" | "medium" | "hard";

  category: Types.ObjectId;
  author: Types.ObjectId;

  images?: string[];
  tags?: string[];

  views?: number;
  likes?: number;

  nutritionInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

const RecipeSchema = new Schema<IRecipe>(
  {
    title: { type: String, required: true, trim: true },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    instructions: {
      type: [String],
      default: [],
    },
    prepTime: {
      type: Number,
      default: 0,
      min: 0,
    },
    cookTime: {
      type: Number,
      default: 0,
      min: 0,
    },
    servings: {
      type: Number,
      default: 1,
      min: 1,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
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
    nutritionInfo: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      fiber: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

RecipeSchema.index({ title: "text", tags: "text" });
RecipeSchema.index({ category: 1 });

export const RecipeModel = model<IRecipe>("Recipe", RecipeSchema);
