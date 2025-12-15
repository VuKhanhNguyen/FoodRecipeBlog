import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await authService.login(formData.username, formData.password);
      // Chuyển về trang chủ
      navigate("/");
      // Reload để cập nhật header
      window.location.reload();
    } catch (err) {
      setError(err.message || "Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="login-form-wrapper">
      <div className="login-form-header">
        <h2>Đăng Nhập</h2>
        <p>Chào mừng bạn trở lại! Vui lòng đăng nhập vào tài khoản của bạn.</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="username">
            <i className="fa fa-user"></i> Tên đăng nhập
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Nhập tên đăng nhập"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <i className="fa fa-lock"></i> Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-options">
          <div className="remember-me">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <label htmlFor="remember">Ghi nhớ đăng nhập</label>
          </div>
          <a href="#" className="forgot-password">
            Quên mật khẩu?
          </a>
        </div>

        <button type="submit" className="metro_btn-custom btn-login">
          Đăng Nhập
        </button>

        <div className="signup-link">
          <p>
            Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
