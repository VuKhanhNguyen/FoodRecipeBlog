import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentSubmitForm from "./CommentSubmitForm";
import commentService from "../../services/commentService";

/**
 * Component tổng hợp để hiển thị danh sách comments và form submit comment
 * Sử dụng trong RecipeDetailPage
 */
const CommentSection = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load comments khi component mount
  useEffect(() => {
    loadComments();
  }, [recipeId]);

  const loadComments = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await commentService.getCommentsByRecipeId(recipeId);
      setComments(result.comments || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Callback khi thêm comment mới thành công
  const handleCommentAdded = (newComment) => {
    setComments([newComment, ...comments]);
  };

  return (
    <div className="metro_comment-section">
      {/* Form submit comment mới */}
      <CommentSubmitForm
        recipeId={recipeId}
        onCommentAdded={handleCommentAdded}
      />
      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div className="alert alert-danger" style={{ marginTop: "20px" }}>
          {error}
        </div>
      )}
      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Đang tải bình luận...
        </div>
      )}
      {/* Danh sách comments */}
      {/* {!loading && <CommentForm comments={comments} />} */}
    </div>
  );
};

export default CommentSection;
