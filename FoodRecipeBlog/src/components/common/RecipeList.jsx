import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ categoryName }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        let url = "http://localhost:5000/api/recipes/all";

        if (categoryName) {
          // Decode và encode lại để đảm bảo format đúng
          const decodedCategory = decodeURIComponent(categoryName);
          url = `http://localhost:5000/api/recipes/category/${encodeURIComponent(
            decodedCategory
          )}`;
        }

        console.log("Fetching from URL:", url); // Debug

        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Server error:", errorData); // Debug error từ server
          throw new Error(
            errorData.error || "Không thể tải danh sách công thức"
          );
        }

        const data = await response.json();
        console.log("Recipes data:", data.recipes); // Debug
        setRecipes(data.recipes || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="col-12 text-center">
        <p>Đang tải công thức...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-12 text-center">
        <p className="text-danger">Lỗi: {error}</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="col-12 text-center">
        <p>Không có công thức nào trong danh mục này.</p>
      </div>
    );
  }

  return (
    <>
      {recipes.map((recipe) => (
        <div key={recipe._id} className="col-lg-4 col-md-6">
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </>
  );
};

export default RecipeList;
