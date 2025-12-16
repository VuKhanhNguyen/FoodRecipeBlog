import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import recipeService from "../../services/recipeService";
import authService from "../../services/authService";

const BlogForm = ({ blog, onSave, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    author: localStorage.getItem("username") || "admin",
    date: new Date().toLocaleDateString("vi-VN"),
    tags: "",
  });

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

    if (blog) {
      setFormData({
        ...blog,
        category: blog.category?._id || blog.category || "",
        tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
        image: (blog.images && blog.images[0]) || blog.image || "",
      });
    }
  }, [blog]);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Vui lòng nhập tiêu đề blog!");
      return;
    }

    if (!formData.description.trim()) {
      alert("Vui lòng nhập nội dung blog!");
      return;
    }

    if (!formData.category) {
      alert("Vui lòng chọn danh mục!");
      return;
    }

    const user = authService.getCurrentUser();
    if (!user) {
      alert("Vui lòng đăng nhập!");
      return;
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
      title: formData.title,
      category: formData.category,
      description: formData.description,
      images: formData.image ? [formData.image] : [],
      tags: tagsArray,
      // Default values for required fields in Recipe model if not present in BlogForm
      prepTime: 0,
      cookTime: 0,
      servings: 0,
      difficulty: "medium",
      ingredients: [],
      instructions: [],
      nutritionInfo: {},
    };

    try {
      if (blog) {
        await recipeService.updateRecipe(blog.id || blog._id, recipeData);
        alert("Cập nhật blog thành công!");
      } else {
        await recipeService.createRecipe(recipeData);
        alert("Tạo blog mới thành công!");
      }

      if (onSave) {
        onSave(recipeData);
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("Lưu thất bại: " + error.message);
    }
  };

  return (
    <div className="blog-form-container">
      <div className="blog-form-header">
        <h2>
          <i className="fa fa-edit"></i>
          {blog ? "Chỉnh sửa Blog" : "Tạo Blog mới"}
        </h2>
        <button className="btn-close" onClick={onCancel}>
          <i className="fa fa-times"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-row">
          <div className="form-group col-md-8">
            <label>
              Tiêu đề Blog <span className="required">*</span>
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Nhập tiêu đề blog..."
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group col-md-4">
            <label>
              Danh mục <span className="required">*</span>
            </label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat._id || cat.id} value={cat._id || cat.id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <>
                  <option value="appetizers">Khai vị</option>
                  <option value="main-course">Món chính</option>
                  <option value="dessert">Tráng miệng</option>
                  <option value="breakfast">Bữa sáng</option>
                  <option value="lunch">Bữa trưa</option>
                  <option value="dinner">Bữa tối</option>
                  <option value="snacks">Ăn vặt</option>
                  <option value="drinks">Đồ uống</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>
            Nội dung Blog <span className="required">*</span>
          </label>
          <div className="rich-text-editor">
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={handleDescriptionChange}
              modules={quillModules}
              placeholder="Viết nội dung blog của bạn..."
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            Ảnh đại diện <span className="required">*</span>
          </label>
          <div className="image-upload-wrapper">
            <input
              type="file"
              id="blogImage"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="blogImage" className="image-upload-label">
              <i className="fa fa-cloud-upload"></i>
              <span>Chọn ảnh hoặc kéo thả vào đây</span>
            </label>
            {formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt="Preview" />
                <button
                  type="button"
                  className="btn-remove-image"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, image: "" }))
                  }
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Tags (phân cách bằng dấu phẩy)</label>
          <input
            type="text"
            name="tags"
            className="form-control"
            placeholder="Ví dụ: món ngon, dễ làm, tiết kiệm"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            <i className="fa fa-times"></i> Hủy
          </button>
          <button type="submit" className="btn-save">
            <i className="fa fa-save"></i> {blog ? "Cập nhật" : "Tạo Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
