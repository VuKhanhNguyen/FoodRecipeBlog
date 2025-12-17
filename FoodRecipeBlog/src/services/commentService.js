import authService from "./authService";
import {
  increment as startLoading,
  decrement as stopLoading,
} from "../utils/loadingManager";

const API_URL = "http://localhost:5000/api";

class CommentService {
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

    startLoading();
    let response;
    let data;
    try {
      response = await fetch(url, config);
      data = await response.json();
    } finally {
      stopLoading();
    }

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        authService.logout();
        throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      }
      throw new Error(data.error || "Có lỗi xảy ra");
    }

    return data;
  }

  // Lấy tất cả comments
  async getAllComments() {
    return this.fetchWithAuth(`${API_URL}/comments/all`);
  }

  // Lấy comments theo recipe ID
  async getCommentsByRecipeId(recipeId) {
    return this.fetchWithAuth(`${API_URL}/comments/recipe/${recipeId}`);
  }

  // Lấy comments theo tác giả
  async getCommentsByAuthor(author) {
    return this.fetchWithAuth(`${API_URL}/comments/author/${author}`);
  }

  // Lấy comment theo ID
  async getCommentById(id) {
    return this.fetchWithAuth(`${API_URL}/comments/${id}`);
  }

  // Tạo comment mới (yêu cầu authentication)
  async createComment(commentData) {
    return this.fetchWithAuth(`${API_URL}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
    });
  }

  // Cập nhật comment (yêu cầu authentication)
  async updateComment(id, commentData) {
    return this.fetchWithAuth(`${API_URL}/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify(commentData),
    });
  }

  // Xóa comment (yêu cầu authentication)
  async deleteComment(id) {
    return this.fetchWithAuth(`${API_URL}/comments/${id}`, {
      method: "DELETE",
    });
  }
}

export default new CommentService();
