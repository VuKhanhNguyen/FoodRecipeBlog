import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RecipeForm = ({ formData, setFormData }) => {
  // Cấu hình toolbar cho Rich Text Editor
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        recipeImage: file,
      }));
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  const handleDirectionChange = (index, value) => {
    const newDirections = [...formData.directions];
    newDirections[index] = value;
    setFormData((prev) => ({
      ...prev,
      directions: newDirections,
    }));
  };

  const addDirection = () => {
    setFormData((prev) => ({
      ...prev,
      directions: [...prev.directions, ""],
    }));
  };

  const removeDirection = (index) => {
    const newDirections = formData.directions.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      directions: newDirections,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe Data:", formData);
    alert("Công thức đã được gửi thành công!");
    // Xử lý submit form ở đây
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-submit-form">
      {/* Basic Information Section */}
      <div className="recipe-submit-section">
        <h4 className="section-title">Thông tin cơ bản</h4>

        <div className="form-group">
          <label htmlFor="recipeName">
            Tên công thức <span className="required">*</span>
          </label>
          <input
            type="text"
            id="recipeName"
            name="recipeName"
            className="form-control"
            placeholder="Nhập tên công thức"
            value={formData.recipeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">
            Danh mục <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Chọn danh mục</option>
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

        <div className="form-group">
          <label htmlFor="description">
            Mô tả công thức <span className="required">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, description: value }))
            }
            modules={quillModules}
            formats={quillFormats}
            placeholder="Viết mô tả chi tiết về công thức của bạn..."
            className="rich-text-editor"
          />
        </div>
      </div>

      {/* Recipe Image */}
      <div className="recipe-submit-section">
        <h4 className="section-title">Hình ảnh công thức</h4>
        <div className="form-group">
          <label htmlFor="recipeImage">Tải lên hình ảnh</label>
          <div className="custom-file-upload">
            <input
              type="file"
              id="recipeImage"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <label htmlFor="recipeImage" className="file-label">
              <i className="fa fa-cloud-upload"></i>
              <span>
                {formData.recipeImage
                  ? formData.recipeImage.name
                  : "Chọn hình ảnh"}
              </span>
            </label>
          </div>
          {formData.recipeImage && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(formData.recipeImage)}
                alt="Preview"
              />
            </div>
          )}
        </div>
      </div>

      {/* Recipe Details */}
      <div className="recipe-submit-section">
        <h4 className="section-title">Chi tiết công thức</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="prepTime">Thời gian chuẩn bị (phút)</label>
              <input
                type="number"
                id="prepTime"
                name="prepTime"
                className="form-control"
                placeholder="VD: 30"
                value={formData.prepTime}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="cookTime">Thời gian nấu (phút)</label>
              <input
                type="number"
                id="cookTime"
                name="cookTime"
                className="form-control"
                placeholder="VD: 45"
                value={formData.cookTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="servings">Khẩu phần</label>
              <input
                type="number"
                id="servings"
                name="servings"
                className="form-control"
                placeholder="VD: 4"
                value={formData.servings}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="calories">Calories</label>
              <input
                type="number"
                id="calories"
                name="calories"
                className="form-control"
                placeholder="VD: 350"
                value={formData.calories}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="difficulty">Độ khó</label>
              <select
                id="difficulty"
                name="difficulty"
                className="form-control"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="">Chọn độ khó</option>
                <option value="easy">Dễ</option>
                <option value="medium">Trung bình</option>
                <option value="hard">Khó</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="recipe-submit-section">
        <h4 className="section-title">Nguyên liệu</h4>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-item">
            <div className="form-group">
              <div className="input-with-button">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Nguyên liệu ${index + 1}`}
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeIngredient(index)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn-add-item" onClick={addIngredient}>
          <i className="fa fa-plus"></i> Thêm nguyên liệu
        </button>
      </div>

      {/* Directions Section */}
      <div className="recipe-submit-section">
        <h4 className="section-title">Hướng dẫn nấu</h4>
        {formData.directions.map((direction, index) => (
          <div key={index} className="direction-item">
            <div className="form-group">
              <label>Bước {index + 1}</label>
              <div className="input-with-button direction-editor-wrapper">
                <ReactQuill
                  theme="snow"
                  value={direction}
                  onChange={(value) => handleDirectionChange(index, value)}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder={`Mô tả bước ${index + 1}...`}
                  className="rich-text-editor"
                />
                {formData.directions.length > 1 && (
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeDirection(index)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn-add-item" onClick={addDirection}>
          <i className="fa fa-plus"></i> Thêm bước
        </button>
      </div>

      {/* Tags Section */}
      <div className="recipe-submit-section">
        <h4 className="section-title">Tags</h4>
        <div className="form-group">
          <label htmlFor="tags">Thêm tags (phân cách bằng dấu phẩy)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="form-control"
            placeholder="VD: món Việt, dễ làm, tiết kiệm"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="form-submit-section">
        <button type="submit" className="metro_btn-custom btn-submit">
          <i className="fa fa-paper-plane"></i> Gửi công thức
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
