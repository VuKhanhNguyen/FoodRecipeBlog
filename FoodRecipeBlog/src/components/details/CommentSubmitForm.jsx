import React, { useState } from "react";
import authService from "../../services/authService";
import commentService from "../../services/commentService";

const CommentSubmitForm = ({ recipeId, onCommentAdded }) => {
  const [formData, setFormData] = useState({
    content: "",
    rating: 0,
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để bình luận");
      return;
    }

    if (!formData.content.trim()) {
      setError("Vui lòng nhập nội dung bình luận");
      return;
    }

    if (formData.rating === 0) {
      setError("Vui lòng chọn đánh giá sao");
      return;
    }

    setLoading(true);

    try {
      const result = await commentService.createComment({
        recipeId,
        content: formData.content,
        rating: formData.rating,
      });

      setSuccess("Đã thêm bình luận thành công!");
      setFormData({ content: "", rating: 0 });

      // Gọi callback để cập nhật danh sách comments
      if (onCommentAdded) {
        onCommentAdded(result.comment);
      }

      // Tự động clear success message sau 3s
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || formData.rating);
      stars.push(
        <i
          key={i}
          className={`fa${isFilled ? "s" : "r"} fa-star`}
          style={{
            cursor: "pointer",
            color: isFilled ? "#ffc107" : "#ccc",
            fontSize: "24px",
            marginRight: "5px",
          }}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
        ></i>
      );
    }
    return stars;
  };

  if (!isAuthenticated) {
    return (
      <div className="metro_comment-form">
        <h4>Để lại bình luận và đánh giá</h4>
        <p style={{ textAlign: "center", padding: "20px" }}>
          Vui lòng <a href="/login">đăng nhập</a> để bình luận và đánh giá
        </p>
      </div>
    );
  }

  return (
    <div className="metro_comment-form">
      <h4>Để lại bình luận và đánh giá</h4>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Đánh giá của bạn:</label>
          <div className="rating-stars" style={{ marginBottom: "15px" }}>
            {renderStars()}
            {formData.rating > 0 && (
              <span style={{ marginLeft: "10px", color: "#666" }}>
                ({formData.rating} sao)
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comment-content">Bình luận:</label>
          <textarea
            id="comment-content"
            className="form-control"
            rows="5"
            placeholder="Chia sẻ suy nghĩ của bạn về công thức này..."
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
          ></textarea>
        </div>

        <div className="form-group">
          <button type="submit" className="metro_btn-custom" disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi bình luận"}
          </button>
        </div>

        <div
          className="user-info"
          style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}
        >
          Đăng bởi: <strong>{currentUser?.username}</strong>
        </div>
      </form>
    </div>
  );
};

export default CommentSubmitForm;
