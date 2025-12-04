import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BlogList from "../components/blog/BlogList";
import "../assets/css/blog_manage.css";

const BlogRecipeManagePage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Load blogs from localStorage
    const savedBlogs = localStorage.getItem("blogs");
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      // Initialize with dummy data
      const dummyBlogs = [
        {
          id: 1,
          title: "Bí quyết làm Bánh Mì giòn ngon tại nhà",
          category: "breakfast",
          description:
            "<p>Bánh mì Việt Nam nổi tiếng với vỏ giòn tan, ruột xốp mềm. Để có được ổ bánh mì hoàn hảo, bạn cần chú ý đến nhiệt độ lò nướng và thời gian nhào bột...</p>",
          image: new URL("../assets/img/blog/1.jpg", import.meta.url).href,
          author: "admin",
          date: "15/12/2024",
          tags: "bánh mì, bữa sáng, dễ làm",
        },
        {
          id: 2,
          title: "Top 10 món ăn Việt Nam được yêu thích nhất",
          category: "main-course",
          description:
            "<p>Ẩm thực Việt Nam đa dạng và phong phú với nhiều món ăn đặc sắc. Từ Phở Hà Nội đến Bánh Xèo miền Trung, mỗi món đều mang hương vị riêng...</p>",
          image: new URL("../assets/img/blog/2.jpg", import.meta.url).href,
          author: "admin",
          date: "14/12/2024",
          tags: "món việt, top 10, ẩm thực",
        },
        {
          id: 3,
          title: "Cách nấu Phở bò chuẩn vị Hà Nội",
          category: "main-course",
          description:
            "<p>Phở bò Hà Nội nổi tiếng với nước dùng trong vắt, thơm ngọt từ xương. Bí quyết nằm ở việc ninh xương đúng lửa và gia vị chuẩn chỉnh...</p>",
          image: new URL("../assets/img/blog/3.jpg", import.meta.url).href,
          author: "admin",
          date: "13/12/2024",
          tags: "phở, hà nội, truyền thống",
        },
        {
          id: 4,
          title: "Hướng dẫn làm Chè Thái mát lạnh cho mùa hè",
          category: "dessert",
          description:
            "<p>Chè Thái là món tráng miệng hoàn hảo cho những ngày hè nóng nực. Với sự kết hợp của nhiều loại trái cây tươi và thạch rau câu...</p>",
          image: new URL("../assets/img/blog/4.jpg", import.meta.url).href,
          author: "admin",
          date: "12/12/2024",
          tags: "chè, tráng miệng, mùa hè",
        },
      ];
      setBlogs(dummyBlogs);
      localStorage.setItem("blogs", JSON.stringify(dummyBlogs));
    }
  }, []);

  const saveBlogs = (updatedBlogs) => {
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

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

  const handleDelete = (id) => {
    const updatedBlogs = blogs.filter((b) => b.id !== id);
    saveBlogs(updatedBlogs);
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
