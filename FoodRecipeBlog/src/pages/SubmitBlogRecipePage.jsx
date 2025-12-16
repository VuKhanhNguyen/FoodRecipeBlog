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
import recipeService from "../services/recipeService";
import authService from "../services/authService";

const SubmitBlogRecipe = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    recipeName: "",
    category: "",
    description: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    fiber: "",
    difficulty: "",
    ingredients: [""],
    directions: [""],
    tags: "",
    recipeImage: null,
  });

  // Load blog để chỉnh sửa nếu có
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await recipeService.getAllCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();

    const editingBlog = localStorage.getItem("editingBlog");
    if (editingBlog) {
      const blog = JSON.parse(editingBlog);
      setFormData({
        recipeName: blog.title || "",
        category: blog.category?._id || blog.category || "",
        description: blog.description || "",
        prepTime: blog.prepTime || "",
        cookTime: blog.cookTime || "",
        servings: blog.servings || "",
        calories: blog.nutritionInfo?.calories || "",
        protein: blog.nutritionInfo?.protein || "",
        carbs: blog.nutritionInfo?.carbs || "",
        fat: blog.nutritionInfo?.fat || "",
        fiber: blog.nutritionInfo?.fiber || "",
        difficulty: blog.difficulty || "",
        ingredients: blog.ingredients || [""],
        directions: blog.instructions || [""],
        tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
        recipeImage: (blog.images && blog.images[0]) || blog.image || null,
      });
    }
  }, []);

  // Hàm lưu blog
  const handleSaveBlog = async () => {
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

    const user = authService.getCurrentUser();
    if (!user) {
      alert("Vui lòng đăng nhập!");
      navigate("/login");
      return;
    }

    let imageBase64 = "";
    if (formData.recipeImage instanceof File) {
      imageBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(formData.recipeImage);
      });
    } else if (typeof formData.recipeImage === "string") {
      imageBase64 = formData.recipeImage;
    }

    const tagsArray = formData.tags
      ? (Array.isArray(formData.tags)
          ? formData.tags
          : formData.tags.split(",")
        )
          .map((t) => t.trim())
          .filter((t) => t)
      : [];

    const recipeData = {
      title: formData.recipeName,
      category: formData.category,
      description: formData.description,
      images: imageBase64 ? [imageBase64] : [],
      prepTime: Number(formData.prepTime) || 0,
      cookTime: Number(formData.cookTime) || 0,
      servings: Number(formData.servings) || 0,
      difficulty: formData.difficulty || "medium",
      ingredients: formData.ingredients.filter((i) => i),
      instructions: formData.directions.filter((d) => d),
      tags: tagsArray,
      nutritionInfo: {
        calories: Number(formData.calories) || 0,
        protein: Number(formData.protein) || 0,
        carbs: Number(formData.carbs) || 0,
        fat: Number(formData.fat) || 0,
        fiber: Number(formData.fiber) || 0,
      },
    };

    try {
      const editingBlog = localStorage.getItem("editingBlog");
      if (editingBlog) {
        const blog = JSON.parse(editingBlog);
        await recipeService.updateRecipe(blog.id || blog._id, recipeData);
        alert("Cập nhật công thức thành công!");
      } else {
        await recipeService.createRecipe(recipeData);
        alert("Tạo công thức mới thành công!");
      }
      localStorage.removeItem("editingBlog");
      navigate("/blog-manage");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Lưu thất bại: " + error.message);
    }
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
              <RecipeForm
                formData={formData}
                setFormData={setFormData}
                categories={categories}
              />
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
