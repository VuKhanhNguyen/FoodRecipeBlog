import React from "react";

const BlogCard = ({
  blog,
  onEdit,
  onDelete,
  onCardClick,
  isAdmin,
  isDetailOpen,
}) => {
  const handleDelete = () => {
    if (
      window.confirm(`Bạn có chắc chắn muốn xóa blog "${blog.title}" không?`)
    ) {
      onDelete(blog.id);
    }
  };

  const getCategoryName = (category) => {
    const categories = {
      appetizers: "Khai vị",
      "main-course": "Món chính",
      dessert: "Tráng miệng",
      breakfast: "Bữa sáng",
      lunch: "Bữa trưa",
      dinner: "Bữa tối",
      snacks: "Ăn vặt",
      drinks: "Đồ uống",
    };
    return categories[category] || category;
  };

  return (
    <div
      className="blog-card"
      onClick={onCardClick ? () => onCardClick(blog) : undefined}
      style={onCardClick ? { cursor: "pointer" } : {}}
    >
      <div className="blog-card-image">
        <img src={blog.image} alt={blog.title} />
        {/* Ẩn lớp phủ overlay khi đang xem chi tiết ở admin */}
        {!(isAdmin && isDetailOpen) && (
          <div className="blog-card-overlay">
            <div className="blog-card-actions">
              <button
                className="btn-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(blog);
                }}
              >
                <i className="fa fa-edit"></i> {isAdmin ? "Xem" : "Sửa"}
              </button>
              <button
                className="btn-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                <i className="fa fa-trash"></i> Xóa
              </button>
            </div>
          </div>
        )}
        <span className="blog-category">{getCategoryName(blog.category)}</span>
      </div>

      <div className="blog-card-content">
        <div className="blog-meta">
          <span className="blog-date">
            <i className="fa fa-calendar"></i> {blog.date}
          </span>
          <span className="blog-author">
            <i className="fa fa-user"></i> {blog.author}
          </span>
        </div>

        <h3 className="blog-title">{blog.title}</h3>

        <div
          className="blog-excerpt"
          dangerouslySetInnerHTML={{
            __html: blog.description.substring(0, 150) + "...",
          }}
        />

        <div className="blog-footer">
          <div className="blog-tags">
            {blog.tags &&
              (Array.isArray(blog.tags) ? blog.tags : blog.tags.split(","))
                .slice(0, 3)
                .map((tag, index) => (
                  <span key={index} className="blog-tag">
                    {tag.trim()}
                  </span>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
