import React from "react";
import recipe1 from "../../assets/img/recipes/1.jpg";
import { useNavigate } from "react-router-dom";
import "../../assets/css/recipeCard.css";
const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  // Fallback data nếu không có recipe prop
  const defaultRecipe = {
    _id: "1",
    title: "Cheese Burger With a Touch of Curry and Cumin",
    description:
      "Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    image: recipe1,
    cookTime: "45",
    difficulty: "Chuyên gia",
    rating: 4,
  };

  const recipeData = recipe || defaultRecipe;

  const handleRecipeClick = (e) => {
    e.preventDefault();
    navigate(`/recipe/${recipeData._id}`);
  };

  const handleDifficultyClick = (e) => {
    e.preventDefault();
    // Navigate to recipe detail or filter by difficulty
  };

  // Render rating stars
  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={`fa fa-star ${i <= rating ? "active" : ""}`}></i>
      );
    }
    return stars;
  };

  const getImageUrl = () => {
    // Kiểm tra nếu có images array và có ít nhất 1 ảnh
    if (
      recipeData.images &&
      recipeData.images.length > 0 &&
      recipeData.images[0]
    ) {
      return recipeData.images[0];
    }
    // Fallback về ảnh mặc định
    return recipe1;
  };

  // Format số lượng (1000 -> 1K, 1000000 -> 1M)
  const formatNumber = (num) => {
    if (!num) return 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  return (
    <article className="metro_post metro_recipe">
      <div className="metro_post-thumb">
        <a href="#" onClick={handleRecipeClick}>
          <img
            src={getImageUrl()}
            alt={recipeData.title}
            onError={(e) => {
              // Nếu ảnh lỗi, dùng ảnh mặc định
              e.target.src = recipe1;
            }}
          />
        </a>
      </div>
      <div className="metro_post-body">
        <div className="metro_post-desc">
          <span className="metro_post-meta">
            <a href="#">
              <i className="far fa-clock"></i> {recipeData.cookTime || "45"}{" "}
              phút
            </a>
            <a href="#" onClick={handleDifficultyClick}>
              <i className="far fa-knife-kitchen"></i>{" "}
              {recipeData.difficulty || "Chuyên gia"}
            </a>
          </span>
          <h5>
            <a href="#" onClick={handleRecipeClick}>
              {recipeData.title}
            </a>
          </h5>
          <p>
            {recipeData.description || recipeData.summary || "Không có mô tả"}
          </p>
        </div>
        <div className="metro_post-footer">
          <div className="metro_rating">{renderStars(recipeData.rating)}</div>
          <div className="metro_post-stats">
            <span className="metro_post-stat-item">
              <i className="far fa-eye"></i>{" "}
              {formatNumber(recipeData.views || 0)}
            </span>
            <span className="metro_post-stat-item">
              <i className="far fa-heart"></i>{" "}
              {formatNumber(recipeData.likes || 0)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
