import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const BlogForm = ({ blog, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "main-course",
    description: "",
    image: "",
    author: localStorage.getItem("username") || "admin",
    date: new Date().toLocaleDateString("vi-VN"),
    tags: "",
  });

  useEffect(() => {
    if (blog) {
      setFormData(blog);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Vui lòng nhập tiêu đề blog!");
      return;
    }

    if (!formData.description.trim()) {
      alert("Vui lòng nhập nội dung blog!");
      return;
    }

    const blogData = {
      ...formData,
      id: blog ? blog.id : Date.now(),
      date: blog ? blog.date : new Date().toLocaleDateString("vi-VN"),
    };

    onSave(blogData);
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
              <option value="appetizers">Khai vị</option>
              <option value="main-course">Món chính</option>
              <option value="dessert">Tráng miệng</option>
              <option value="breakfast">Bữa sáng</option>
              <option value="lunch">Bữa trưa</option>
              <option value="dinner">Bữa tối</option>
              <option value="snacks">Ăn vặt</option>
              <option value="drinks">Đồ uống</option>
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
