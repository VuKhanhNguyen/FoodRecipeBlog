import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BlogList from "../components/blog/BlogList";
import recipeService from "../services/recipeService";
import "../assets/css/blog_manage.css";

import "../assets/css/popupAdmin.css";
const AdminBlogManagePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await recipeService.getAllRecipes();
        // Chuẩn hoá dữ liệu theo cấu trúc BlogCard/BlogList cần
        const formattedBlogs = (data.recipes || []).map((blog) => ({
          ...blog,
          id: blog._id || blog.id,
          category: blog.category?.name || blog.category,
          author: blog.author?.username || blog.author,
          image:
            blog.images && blog.images.length > 0 ? blog.images[0] : blog.image,
          date: blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString("vi-VN")
            : blog.date,
        }));
        setBlogs(formattedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    //if (!window.confirm("Bạn có chắc chắn muốn xoá blog này?")) return;
    try {
      await recipeService.deleteRecipe(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      alert("Không thể xoá blog. Vui lòng thử lại.");
    }
  };

  // Chặn edit (hiện thông báo) - admin không được sửa
  const handleEdit = () => {
    alert("Admin không được phép chỉnh sửa blog!");
  };

  // Khi click vào blog, show chi tiết (dạng popup/modal hoặc tuỳ ý)
  // Ở đây sẽ show dạng modal đơn giản
  const [detailBlog, setDetailBlog] = useState(null);
  const handleViewDetail = (blog) => setDetailBlog(blog);
  const closeDetail = () => setDetailBlog(null);

  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Render
  return (
    <>
      <Header />
      <div className="blog-manage-page admin-page">
        <div className="container">
          <div className="page-header my-4">
            <div className="header-content">
              <h1>
                <i className="fa fa-list"></i> Quản lý Blog (Admin)
              </h1>
              <p>Chỉ được xem, xoá các blog. Không thêm/sửa.</p>
            </div>
          </div>
          {loading ? (
            <div>Đang tải dữ liệu...</div>
          ) : (
            <BlogList
              blogs={blogs}
              onEdit={handleViewDetail} // Nút "Xem" sẽ mở chi tiết
              onDelete={handleDelete}
              onCardClick={handleViewDetail}
              isAdmin={true}
              isDetailOpen={!!detailBlog}
            />
          )}
        </div>
        {/* Modal chi tiết blog */}
        {detailBlog && (
          <>
            {/* Nền mờ ngoài modal */}
            <div
              className="modal-backdrop fade show admin-backdrop"
              onClick={closeDetail}
            />
            <div
              className="modal show admin-modal"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Chi tiết Blog</h5>
                    <button className="btn btn-close" onClick={closeDetail}>
                      <span>&times;</span>
                    </button>
                  </div>
                  <div
                    className="modal-body"
                    style={{ maxHeight: "70vh", overflowY: "auto" }}
                  >
                    <div className="blog-detail-container">
                      {/* Sidebar trái: Ảnh và stats */}
                      <div className="detail-sidebar">
                        {detailBlog.image && (
                          <div className="detail-image-wrapper">
                            <img src={detailBlog.image} alt="blog" />
                          </div>
                        )}
                        <div className="recipe-stats-grid">
                          <div className="stat-item">
                            <span className="stat-label">Độ khó</span>
                            <span className="stat-value">
                              {detailBlog.difficulty || "-"}
                            </span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Chuẩn bị</span>
                            <span className="stat-value">
                              {detailBlog.prepTime
                                ? detailBlog.prepTime + " phút"
                                : "-"}
                            </span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Nấu</span>
                            <span className="stat-value">
                              {detailBlog.cookTime
                                ? detailBlog.cookTime + " phút"
                                : "-"}
                            </span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Khẩu phần</span>
                            <span className="stat-value">
                              {detailBlog.servings || "-"}
                            </span>
                          </div>
                        </div>
                        <div className="info-group">
                          <span className="info-label">Danh mục:</span>
                          {detailBlog.category}
                        </div>
                        <div className="info-group">
                          <span className="info-label">Tác giả:</span>
                          {detailBlog.author}
                        </div>
                        <div className="info-group">
                          <span className="info-label">Ngày đăng:</span>
                          {detailBlog.date}
                        </div>
                        {detailBlog.tags && (
                          <div className="info-group">
                            <span className="info-label">Tags:</span>
                            {Array.isArray(detailBlog.tags)
                              ? detailBlog.tags.map((tag, idx) => (
                                  <span className="blog-tag" key={idx}>
                                    {tag}
                                  </span>
                                ))
                              : detailBlog.tags}
                          </div>
                        )}
                      </div>
                      {/* Nội dung phải */}
                      <div className="detail-content">
                        <h2 className="section-title">{detailBlog.title}</h2>
                        <div className="info-group">
                          <span className="info-label">Mô tả:</span>
                          <div
                            style={{ marginTop: 5 }}
                            dangerouslySetInnerHTML={{
                              __html: detailBlog.description,
                            }}
                          />
                        </div>
                        {detailBlog.ingredients && (
                          <div className="info-group">
                            <span className="section-title">Nguyên liệu:</span>
                            <ul className="ingredients-list">
                              {Array.isArray(detailBlog.ingredients)
                                ? detailBlog.ingredients.map((ing, idx) => (
                                    <li key={idx}>
                                      {typeof ing === "string"
                                        ? ing
                                        : ing?.name || JSON.stringify(ing)}
                                    </li>
                                  ))
                                : typeof detailBlog.ingredients === "string"
                                ? detailBlog.ingredients
                                    .split("\n")
                                    .map((ing, idx) => <li key={idx}>{ing}</li>)
                                : null}
                            </ul>
                          </div>
                        )}
                        {detailBlog.instructions && (
                          <div className="info-group">
                            <span className="section-title">Hướng dẫn:</span>
                            <ol className="instructions-list">
                              {Array.isArray(detailBlog.instructions)
                                ? detailBlog.instructions.map((step, idx) => (
                                    <li key={idx}>{stripHtml(step)}</li>
                                  ))
                                : typeof detailBlog.instructions === "string"
                                ? detailBlog.instructions
                                    .split("\n")
                                    .map((step, idx) => (
                                      <li key={idx}>{stripHtml(step)}</li>
                                    ))
                                : null}
                            </ol>
                          </div>
                        )}
                        {detailBlog.nutritionInfo &&
                          typeof detailBlog.nutritionInfo === "object" && (
                            <div className="info-group">
                              <span className="section-title">
                                Thông tin dinh dưỡng:
                              </span>
                              <div className="nutrition-box">
                                <ul style={{ marginTop: 5, marginBottom: 0 }}>
                                  {Object.entries(detailBlog.nutritionInfo).map(
                                    ([key, value]) => (
                                      <li className="nutrition-item" key={key}>
                                        <span>{key}</span>
                                        <span>{value}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminBlogManagePage;
