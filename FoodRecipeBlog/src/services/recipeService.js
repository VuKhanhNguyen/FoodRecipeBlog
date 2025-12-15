import authService from "./authService";

const API_URL = "http://localhost:5000/api";

class RecipeService {
  // Helper để tạo fetch request với JWT token
  async fetchWithAuth(url, options = {}) {
    const token = authService.getToken();

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Nếu token hết hạn hoặc không hợp lệ
      if (response.status === 401 || response.status === 403) {
        authService.logout();
        throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      }
      throw new Error(data.error || "Có lỗi xảy ra");
    }

    return data;
  }

  // Lấy tất cả recipes
  async getAllRecipes() {
    return this.fetchWithAuth(`${API_URL}/recipes`);
  }

  // Lấy recipe theo ID
  async getRecipeById(id) {
    return this.fetchWithAuth(`${API_URL}/recipes/${id}`);
  }

  // Tạo recipe mới (yêu cầu authentication)
  async createRecipe(recipeData) {
    return this.fetchWithAuth(`${API_URL}/recipes`, {
      method: "POST",
      body: JSON.stringify(recipeData),
    });
  }

  // Cập nhật recipe (yêu cầu authentication)
  async updateRecipe(id, recipeData) {
    return this.fetchWithAuth(`${API_URL}/recipes/${id}`, {
      method: "PUT",
      body: JSON.stringify(recipeData),
    });
  }

  // Xóa recipe (yêu cầu authentication)
  async deleteRecipe(id) {
    return this.fetchWithAuth(`${API_URL}/recipes/${id}`, {
      method: "DELETE",
    });
  }

  // Lấy recipes theo category
  async getRecipesByCategory(categoryId) {
    return this.fetchWithAuth(`${API_URL}/recipes/category/${categoryId}`);
  }

  // Thêm comment (yêu cầu authentication)
  async addComment(recipeId, commentData) {
    return this.fetchWithAuth(`${API_URL}/comments`, {
      method: "POST",
      body: JSON.stringify({
        ...commentData,
        recipeId,
      }),
    });
  }

  // Thêm vào favorites (yêu cầu authentication)
  async addToFavorites(recipeId) {
    return this.fetchWithAuth(`${API_URL}/favorites`, {
      method: "POST",
      body: JSON.stringify({ recipeId }),
    });
  }

  // Xóa khỏi favorites (yêu cầu authentication)
  async removeFromFavorites(recipeId) {
    return this.fetchWithAuth(`${API_URL}/favorites/${recipeId}`, {
      method: "DELETE",
    });
  }

  // Lấy favorites của user (yêu cầu authentication)
  async getUserFavorites() {
    return this.fetchWithAuth(`${API_URL}/favorites/user`);
  }
}

export default new RecipeService();
