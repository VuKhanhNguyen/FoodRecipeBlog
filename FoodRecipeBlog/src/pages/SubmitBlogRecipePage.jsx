import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import RecipeForm from "../components/recipeManage/RecipeForm";
import RecipePreview from "../components/recipeManage/RecipePreview";
import WidgetSearch from "../components/sidebar/WidgetSearch";
import WidgetRecentPost from "../components/sidebar/WidgetRecentPost";
import WidgetCategories from "../components/sidebar/WidgetCategories";
import WidgetTags from "../components/sidebar/WidgetTags";
import SidebarCTA from "../components/sidebar/SidebarCTA";
import SidebarCTA3 from "../components/sidebar/SidebarCTA3";
import "../assets/css/blog_submit.css";
import AddBlogRecipeBanner from "../components/otherBanner/SubmitBlogRecipeBanner";
import InstagramFeed from "../components/home/InstagramFeed";

const SubmitBlogRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipeName: "",
    category: "",
    description: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    calories: "",
    difficulty: "",
    ingredients: [""],
    directions: [""],
    tags: "",
    recipeImage: null,
  });

  // Load blog để chỉnh sửa nếu có
  useEffect(() => {
    const editingBlog = localStorage.getItem("editingBlog");
    if (editingBlog) {
      const blog = JSON.parse(editingBlog);
      setFormData({
        recipeName: blog.title || "",
        category: blog.category || "",
        description: blog.description || "",
        prepTime: "",
        cookTime: "",
        servings: "",
        calories: "",
        difficulty: "",
        ingredients: [""],
        directions: [""],
        tags: blog.tags || "",
        recipeImage: blog.image || null,
      });
    }
  }, []);

  // Hàm lưu blog
  const handleSaveBlog = () => {
    // Validation cho các trường bắt buộc
    if (!formData.recipeName.trim()) {
      alert("Vui lòng nhập tên công thức!");
      document.getElementById("recipeName")?.focus();
      return;
    }

    if (!formData.category) {
      alert("Vui lòng chọn danh mục!");
      document.getElementById("category")?.focus();
      return;
    }

    if (
      !formData.description.trim() ||
      formData.description === "<p><br></p>"
    ) {
      alert("Vui lòng nhập mô tả công thức!");
      return;
    }

    const editingBlog = localStorage.getItem("editingBlog");
    const blogData = {
      id: editingBlog ? JSON.parse(editingBlog).id : Date.now(),
      title: formData.recipeName,
      category: formData.category,
      description: formData.description,
      image: formData.recipeImage,
      author: localStorage.getItem("username") || "admin",
      date: editingBlog
        ? JSON.parse(editingBlog).date
        : new Date().toLocaleDateString("vi-VN"),
      tags: formData.tags,
    };

    // Lấy danh sách blogs hiện tại
    const savedBlogs = localStorage.getItem("blogs");
    const blogs = savedBlogs ? JSON.parse(savedBlogs) : [];

    if (editingBlog) {
      // Cập nhật blog
      const updatedBlogs = blogs.map((b) =>
        b.id === blogData.id ? blogData : b
      );
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      alert("Cập nhật blog thành công!");
    } else {
      // Thêm blog mới
      const newBlogs = [blogData, ...blogs];
      localStorage.setItem("blogs", JSON.stringify(newBlogs));
      alert("Tạo blog mới thành công!");
    }

    // Xóa blog đang chỉnh sửa và quay về trang quản lý
    localStorage.removeItem("editingBlog");
    navigate("/blog-manage");
  };

  return (
    <>
      <Header />
      <AddBlogRecipeBanner />
      {/* Main Content */}
      <div className="section metro_post-single blog-recipe-manage-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <RecipeForm formData={formData} setFormData={setFormData} />
              <div
                style={{
                  marginTop: "20px",
                  textAlign: "right",
                  padding: "20px",
                  background: "#fff",
                  borderRadius: "15px",
                }}
              >
                <button
                  onClick={() => navigate("/blog-manage")}
                  className="btn-back"
                  style={{ marginRight: "15px" }}
                >
                  <i className="fa fa-arrow-left"></i> Quay lại
                </button>
                <button onClick={handleSaveBlog} className="btn-save">
                  <i className="fa fa-save"></i> Lưu Blog
                </button>
              </div>
            </div>
            <SidebarCTA3 formData={formData} />
          </div>
        </div>
      </div>
      ;<InstagramFeed />
      <Footer />
    </>
  );
};

export default SubmitBlogRecipe;
