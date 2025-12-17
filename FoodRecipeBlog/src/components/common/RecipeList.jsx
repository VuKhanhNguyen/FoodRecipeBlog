import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import recipeService from "../../services/recipeService";
import authService from "../../services/authService";

const RecipeList = ({
  categoryName,
  page = 1,
  pageSize = 6,
  onTotalChange,
}) => {
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
        let items = data.recipes || [];

        // If logged-in, fetch my favorites and mark isFavorite on recipes
        if (authService.isAuthenticated()) {
          try {
            const favData = await recipeService.getUserFavorites();
            const favs = favData?.favorites || [];
            const favSet = new Set(
              favs
                .map((f) =>
                  typeof f?.recipeId === "string"
                    ? f.recipeId
                    : f?.recipeId?._id
                )
                .filter(Boolean)
            );
            items = items.map((r) => ({
              ...r,
              isFavorite: favSet.has(r._id),
            }));
          } catch (favErr) {
            console.warn("Không thể lấy danh sách yêu thích:", favErr);
          }
        }

        setRecipes(items);
        if (typeof onTotalChange === "function") {
          onTotalChange(items.length);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [categoryName, onTotalChange]);

  // Fetch favorites count for currently visible recipes (lightweight public endpoint)
  useEffect(() => {
    if (!recipes || recipes.length === 0) return;

    let aborted = false;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const current = recipes.slice(startIndex, endIndex);

    const loadCounts = async () => {
      try {
        const results = await Promise.all(
          current.map(async (r) => {
            try {
              const data = await recipeService.getFavoritesCount(r._id);
              return { id: r._id, count: Number(data?.count || 0) };
            } catch {
              return { id: r._id, count: 0 };
            }
          })
        );

        if (aborted) return;

        const countMap = new Map(results.map((x) => [x.id, x.count]));
        setRecipes((prev) =>
          prev.map((r, idx) => {
            if (idx < startIndex || idx >= endIndex) return r;
            const likes = countMap.get(r._id);
            return likes === undefined ? r : { ...r, likes };
          })
        );
      } catch (e) {
        // silently ignore
      }
    };

    loadCounts();
    return () => {
      aborted = true;
    };
  }, [recipes, page, pageSize]);

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

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visible = recipes.slice(startIndex, endIndex);

  return (
    <>
      {visible.map((recipe) => (
        <div key={recipe._id} className="col-lg-4 col-md-6">
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </>
  );
};

export default RecipeList;
