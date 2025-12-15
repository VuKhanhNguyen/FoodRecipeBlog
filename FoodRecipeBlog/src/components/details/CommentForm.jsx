import React from "react";
import people1 from "../../assets/img/people/1.png";
import people2 from "../../assets/img/people/2.png";
import people3 from "../../assets/img/people/3.png";

const CommentForm = ({ comments = [] }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDefaultAvatar = (index) => {
    const avatars = [people1, people2, people3];
    return avatars[index % avatars.length];
  };

  if (comments.length === 0) {
    return (
      <div className="metro_comments-list">
        <h4>Các bình luận</h4>
        <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
      </div>
    );
  }

  return (
    <div className="metro_comments-list">
      <h4>Các bình luận ({comments.length})</h4>
      <ul>
        {comments.map((comment, index) => (
          <li key={comment._id || index} className="comment-item">
            <img
              src={comment.userId?.avatar || getDefaultAvatar(index)}
              alt={comment.userId?.username || "Anonymous"}
            />
            <div className="comment-body">
              <h5>{comment.userId?.username || "Anonymous"}</h5>
              <span>{formatDate(comment.createdAt)}</span>
              <p>{comment.content}</p>
              <a href="#" className="btn-link">
                {" "}
                Reply <i className="fas fa-arrow-right"></i>{" "}
              </a>
            </div>
            {/* Render replies if exists */}
            {comment.replies && comment.replies.length > 0 && (
              <ul>
                {comment.replies.map((reply, replyIndex) => (
                  <li key={reply._id || replyIndex} className="comment-item">
                    <img
                      src={
                        reply.userId?.avatar || getDefaultAvatar(replyIndex + 1)
                      }
                      alt={reply.userId?.username || "Anonymous"}
                    />
                    <div className="comment-body">
                      <h5>{reply.userId?.username || "Anonymous"}</h5>
                      <span>{formatDate(reply.createdAt)}</span>
                      <p>{reply.content}</p>
                      <a href="#" className="btn-link">
                        {" "}
                        Reply <i className="fas fa-arrow-right"></i>{" "}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CommentForm;
