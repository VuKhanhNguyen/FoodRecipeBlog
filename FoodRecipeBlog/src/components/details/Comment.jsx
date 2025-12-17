import React, { useState } from "react";

const Comment = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="metro_comments-form">
      <h4>Để lại bình luận</h4>

      <form method="post">
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              marginBottom: "10px",
              display: "block",
              fontWeight: "bold",
            }}
          >
            Đánh giá:
          </label>
          <div style={{ fontSize: "0" }}>
            {[1, 2, 3, 4, 5].map((starValue) => (
              <i
                key={starValue}
                className={
                  starValue <= (hover || rating) ? "fas fa-star" : "far fa-star"
                }
                style={{
                  fontSize: "30px",
                  color: starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                  cursor: "pointer",
                  transition: "color 200ms",
                  marginRight: "10px",
                }}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(starValue)}
              />
            ))}
            {rating > 0 && (
              <span
                style={{
                  marginLeft: "10px",
                  fontSize: "16px",
                  color: "#666",
                }}
              >
                ({rating} sao)
              </span>
            )}
          </div>
          <input type="hidden" name="rating" value={rating} />
        </div>

        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Nhập bình luận của bạn..."
            name="comment"
            rows="7"
          ></textarea>
          <i className="far fa-feather"></i>
        </div>

        <button
          type="submit"
          className="metro_btn-custom primary"
          name="button"
        >
          Gửi Bình Luận
        </button>
      </form>
    </div>
  );
};
export default Comment;
