import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Đăng ký thất bại");
      }

      // Lưu token và thông tin user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Chuyển hướng về trang chủ
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form-wrapper">
      <div className="register-form-header">
        <h2>Đăng Ký</h2>
        <p>Tạo tài khoản mới để bắt đầu chia sẻ công thức của bạn!</p>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="username">
            <i className="fa fa-user"></i> Tên đăng nhập{" "}
            <span className="required">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nhập tên đăng nhập"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <i className="fa fa-envelope"></i> Email{" "}
            <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fullName">
            <i className="fa fa-id-card"></i> Họ và tên
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nhập họ và tên (tùy chọn)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <i className="fa fa-lock"></i> Mật khẩu{" "}
            <span className="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">
            <i className="fa fa-lock"></i> Xác nhận mật khẩu{" "}
            <span className="required">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
            required
          />
        </div>

        <button
          type="submit"
          className={`metro_btn-custom btn-register ${
            loading ? "loading" : ""
          }`}
          disabled={loading}
        >
          {loading ? "" : "Đăng Ký"}
        </button>

        <div className="login-link">
          <p>
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
