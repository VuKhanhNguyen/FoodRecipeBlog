import React, { useState, useEffect } from "react";
import recipeService from "../../services/recipeService";
import authService from "../../services/authService";

/**
 * Component ví dụ về cách sử dụng JWT Authentication cho CRUD operations
 * với Recipe/Blog trong FoodRecipeBlog
 */
const RecipeCRUDExample = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
  });

  // Kiểm tra authentication
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  // Lấy danh sách recipes
  const fetchRecipes = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await recipeService.getAllRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Tạo recipe mới (yêu cầu authentication)
  const handleCreateRecipe = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để tạo recipe mới");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const newRecipe = await recipeService.createRecipe({
        ...formData,
        author: currentUser._id,
      });

      setRecipes([...recipes, newRecipe]);
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
      });
      alert("Tạo recipe thành công!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật recipe (yêu cầu authentication)
  const handleUpdateRecipe = async (recipeId, updatedData) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để cập nhật recipe");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const updatedRecipe = await recipeService.updateRecipe(
        recipeId,
        updatedData
      );
      setRecipes(recipes.map((r) => (r._id === recipeId ? updatedRecipe : r)));
      alert("Cập nhật recipe thành công!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Xóa recipe (yêu cầu authentication)
  const handleDeleteRecipe = async (recipeId) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để xóa recipe");
      return;
    }

    if (!window.confirm("Bạn có chắc muốn xóa recipe này?")) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await recipeService.deleteRecipe(recipeId);
      setRecipes(recipes.filter((r) => r._id !== recipeId));
      alert("Xóa recipe thành công!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Thêm comment (yêu cầu authentication)
  const handleAddComment = async (recipeId, commentText) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để comment");
      return;
    }

    try {
      await recipeService.addComment(recipeId, {
        content: commentText,
        user: currentUser._id,
      });
      alert("Đã thêm comment!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Thêm/xóa favorite (yêu cầu authentication)
  const handleToggleFavorite = async (recipeId, isFavorite) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để lưu favorite");
      return;
    }

    try {
      if (isFavorite) {
        await recipeService.removeFromFavorites(recipeId);
        alert("Đã xóa khỏi favorites");
      } else {
        await recipeService.addToFavorites(recipeId);
        alert("Đã thêm vào favorites");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="recipe-crud-example">
      <h2>Recipe CRUD với JWT Authentication</h2>

      {error && <div className="error-message">{error}</div>}

      {/* Hiển thị thông tin user */}
      <div className="user-info">
        {isAuthenticated ? (
          <div>
            <p>Xin chào, {currentUser?.username}!</p>
            <button onClick={() => authService.logout()}>Đăng xuất</button>
          </div>
        ) : (
          <div>
            <p>Bạn chưa đăng nhập</p>
            <a href="/login">Đăng nhập</a>
          </div>
        )}
      </div>

      {/* Form tạo recipe mới (chỉ hiển thị khi đã đăng nhập) */}
      {isAuthenticated && (
        <form onSubmit={handleCreateRecipe} className="create-recipe-form">
          <h3>Tạo Recipe Mới</h3>
          <input
            type="text"
            placeholder="Tiêu đề"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Mô tả"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Nguyên liệu"
            value={formData.ingredients}
            onChange={(e) =>
              setFormData({ ...formData, ingredients: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Hướng dẫn"
            value={formData.instructions}
            onChange={(e) =>
              setFormData({ ...formData, instructions: e.target.value })
            }
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Đang tạo..." : "Tạo Recipe"}
          </button>
        </form>
      )}

      {/* Danh sách recipes */}
      <div className="recipes-list">
        <h3>Danh Sách Recipes</h3>
        {loading && <p>Đang tải...</p>}
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h4>{recipe.title}</h4>
            <p>{recipe.description}</p>

            {/* Các action buttons (chỉ hiển thị khi đã đăng nhập) */}
            {isAuthenticated && (
              <div className="recipe-actions">
                <button
                  onClick={() =>
                    handleUpdateRecipe(recipe._id, { title: "Updated Title" })
                  }
                >
                  Cập nhật
                </button>
                <button onClick={() => handleDeleteRecipe(recipe._id)}>
                  Xóa
                </button>
                <button
                  onClick={() => handleAddComment(recipe._id, "Great recipe!")}
                >
                  Thêm Comment
                </button>
                <button onClick={() => handleToggleFavorite(recipe._id, false)}>
                  Thêm Favorite
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCRUDExample;
