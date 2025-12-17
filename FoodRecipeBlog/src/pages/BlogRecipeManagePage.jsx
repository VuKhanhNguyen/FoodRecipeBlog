import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BlogList from "../components/blog/BlogList";
import recipeService from "../services/recipeService";
import authService from "../services/authService";
import "../assets/css/blog_manage.css";

const BlogRecipeManagePage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const user = authService.getCurrentUser();
        const userId = user?.id || user?._id;
        if (userId) {
          const data = await recipeService.getRecipesByAuthor(userId);
          const formattedBlogs = data.recipes.map((blog) => ({
            ...blog,
            id: blog._id || blog.id,
            category: blog.category?.name || blog.category,
            author: blog.author?.username || blog.author,
            image:
              blog.images && blog.images.length > 0
                ? blog.images[0]
                : blog.image,
            date: blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("vi-VN")
              : blog.date,
          }));
          setBlogs(formattedBlogs);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, [navigate]);

  const handleCreate = () => {
    // Xóa blog đang chỉnh sửa và chuyển đến trang tạo mới
    localStorage.removeItem("editingBlog");
    navigate("/recipe-submit");
  };

  const handleEdit = (blog) => {
    // Lưu blog cần chỉnh sửa vào localStorage
    localStorage.setItem("editingBlog", JSON.stringify(blog));
    navigate("/recipe-submit");
  };

  const handleDelete = async (id) => {
    try {
      await recipeService.deleteRecipe(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Không thể xóa blog. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <Header />
      <div className="blog-manage-page">
        <div className="container">
          <div className="page-header">
            <div className="header-content">
              <h1>
                <i className="fa fa-edit"></i> Quản lý Blog
              </h1>
              <p>Tạo, chỉnh sửa và quản lý các bài viết blog của bạn</p>
            </div>
            <button className="btn-create-blog" onClick={handleCreate}>
              <i className="fa fa-plus"></i> Tạo Blog mới
            </button>
          </div>

          <BlogList blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogRecipeManagePage;
