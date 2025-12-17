import {
  increment as startLoading,
  decrement as stopLoading,
} from "../utils/loadingManager";
const API_URL = "http://localhost:5000/api";

class AuthService {
  async register(userData) {
    startLoading();
    let response;
    let data;
    try {
      response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      data = await response.json();
    } finally {
      stopLoading();
    }

    if (!response.ok) {
      throw new Error(data.error || "Đăng ký thất bại");
    }

    // Lưu token và thông tin user vào localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  }

  async login(username, password) {
    startLoading();
    let response;
    let data;
    try {
      response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      data = await response.json();
    } finally {
      stopLoading();
    }

    if (!response.ok) {
      throw new Error(data.error || "Đăng nhập thất bại");
    }

    // Lưu token và thông tin user vào localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  // Helper để thêm Authorization header vào các request
  getAuthHeaders() {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }
}

export default new AuthService();
