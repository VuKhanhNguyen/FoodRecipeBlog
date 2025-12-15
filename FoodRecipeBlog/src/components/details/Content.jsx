import React, { useState, useEffect } from "react";
import EntryContent from "./EntryContent";
import CommentForm from "./CommentForm";
import recipe1 from "../../assets/img/recipe/1.jpg";

const Content = ({ recipe, commentsCount = 0 }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recipe?._id) {
      fetchComments(recipe._id);
    }
  }, [recipe?._id]);

  const fetchComments = async (recipeId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/comments/recipe/${recipeId}`
      );
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  if (!recipe) {
    return <div>Đang tải...</div>;
  }

  // Map API data to component format
  const recipeData = {
    recipeName: recipe.title || "Không có tên",
    category: recipe.category?.name || "Chưa phân loại",
    description: recipe.description || "Không có mô tả",
    prepTime: recipe.prepTime?.toString() || "0",
    cookTime: recipe.cookTime?.toString() || "0",
    servings: recipe.servings?.toString() || "1",
    calories: recipe.nutritionInfo?.calories?.toString() || "0",
    protein: recipe.nutritionInfo?.protein?.toString() || "0",
    carbs: recipe.nutritionInfo?.carbs?.toString() || "0",
    fat: recipe.nutritionInfo?.fat?.toString() || "0",
    fiber: recipe.nutritionInfo?.fiber?.toString() || "0",
    difficulty: recipe.difficulty || "medium",
    ingredients: recipe.ingredients || [],
    directions: recipe.instructions || [],
    tags: Array.isArray(recipe.tags)
      ? recipe.tags.join(", ")
      : recipe.tags || "",
    recipeImage:
      recipe.images && recipe.images.length > 0 ? recipe.images[0] : recipe1,
    author: recipe.author?.username || "Anonymous",
    comments: commentsCount,
    rating: recipe.rating || 0,
    likes: recipe.likes || 0,
    views: recipe.views || 0,
    date: {
      day: recipe.createdAt
        ? new Date(recipe.createdAt).getDate().toString()
        : "01",
      month: recipe.createdAt
        ? new Date(recipe.createdAt).toLocaleDateString("en-US", {
            month: "short",
          })
        : "Jan",
    },
  };

  return (
    <div className="metro_post-single-wrapper metro_recipe-single-wrapper">
      <h2 className="entry-title">{recipeData.recipeName}</h2>

      <div className="metro_rating-wrapper">
        <div className="metro_rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fa fa-star ${
                star <= Math.floor(recipeData.rating) ? "active" : ""
              }`}
            ></i>
          ))}
        </div>
        <span>{recipeData.rating} Stars</span>
      </div>

      <div className="metro_post-single-thumb">
        <img src={recipeData.recipeImage} alt={recipeData.recipeName} />
        <div className="metro_post-date">
          <span>{recipeData.date.day}</span>
          <span>{recipeData.date.month}</span>
        </div>
      </div>

      {/* Entry Content Component - truyền data xuống */}
      <EntryContent recipeData={recipeData} />
      {loading ? (
        <div>Đang tải bình luận...</div>
      ) : (
        <CommentForm comments={comments} />
      )}
    </div>
  );
};

export default Content;
