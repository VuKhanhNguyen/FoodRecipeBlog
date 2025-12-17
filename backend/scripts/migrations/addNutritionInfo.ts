import mongoose from "mongoose";
import { RecipeModel } from "../../src/models/Recipe";
import logger from "jet-logger";
import dotenv from "dotenv";
import path from "path";

// Load environment variables từ file .env
dotenv.config({
  path: path.resolve(__dirname, "../../config/.env.development"),
});

const addNutritionInfoToRecipes = async () => {
  try {
    // Lấy MongoDB URI từ environment variable
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MongoDB URI not found in environment variables");
    }

    await mongoose.connect(mongoUri);
    logger.info("Connected to MongoDB");

    // Cập nhật tất cả recipes chưa có nutritionInfo
    const result = await RecipeModel.updateMany(
      {
        $or: [{ nutritionInfo: { $exists: false } }, { nutritionInfo: null }],
      },
      {
        $set: {
          nutritionInfo: {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0,
          },
        },
      }
    );

    logger.info(
      `Updated ${result.modifiedCount} recipes with default nutrition info`
    );
    logger.info(`Matched ${result.matchedCount} recipes`);

    await mongoose.connection.close();
    logger.info("Database connection closed");
    process.exit(0);
  } catch (error) {
    logger.err("Error updating recipes:", error);
    process.exit(1);
  }
};

addNutritionInfoToRecipes();
