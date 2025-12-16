import React from "react";

const RecipePreview = ({ formData }) => {
  const getTotalTime = () => {
    const prep = parseInt(formData.prepTime) || 0;
    const cook = parseInt(formData.cookTime) || 0;
    return prep + cook;
  };

  const getDifficultyText = () => {
    switch (formData.difficulty) {
      case "easy":
        return "Dễ";
      case "medium":
        return "Trung bình";
      case "hard":
        return "Khó";
      default:
        return "";
    }
  };

  return (
    <div className="recipe-preview-card">
      <div className="preview-header">
        <h5>
          <i className="fa fa-eye"></i> Xem trước công thức
        </h5>
      </div>

      <div className="preview-body">
        {formData.recipeImage && (
          <div className="preview-image">
            <img
              src={
                typeof formData.recipeImage === "string"
                  ? formData.recipeImage
                  : URL.createObjectURL(formData.recipeImage)
              }
              alt="Recipe"
            />
          </div>
        )}

        {formData.recipeName && (
          <div className="preview-section">
            <h4>{formData.recipeName}</h4>
          </div>
        )}

        {formData.category && (
          <div className="preview-section">
            <span className="preview-badge">
              <i className="fa fa-tag"></i> {formData.category}
            </span>
          </div>
        )}

        {formData.description && (
          <div className="preview-section">
            <div
              className="preview-description"
              dangerouslySetInnerHTML={{ __html: formData.description }}
            />
          </div>
        )}

        {(formData.prepTime ||
          formData.cookTime ||
          formData.servings ||
          formData.calories ||
          formData.difficulty) && (
          <div className="preview-section recipe-meta">
            <div className="meta-grid">
              {formData.prepTime && (
                <div className="meta-item">
                  <i className="fa fa-clock"></i>
                  <div>
                    <small>Chuẩn bị</small>
                    <strong>{formData.prepTime} phút</strong>
                  </div>
                </div>
              )}
              {formData.cookTime && (
                <div className="meta-item">
                  <i className="fa fa-fire"></i>
                  <div>
                    <small>Nấu</small>
                    <strong>{formData.cookTime} phút</strong>
                  </div>
                </div>
              )}
              {(formData.prepTime || formData.cookTime) && (
                <div className="meta-item">
                  <i className="fa fa-hourglass-half"></i>
                  <div>
                    <small>Tổng thời gian</small>
                    <strong>{getTotalTime()} phút</strong>
                  </div>
                </div>
              )}
              {formData.servings && (
                <div className="meta-item">
                  <i className="fa fa-users"></i>
                  <div>
                    <small>Khẩu phần</small>
                    <strong>{formData.servings} người</strong>
                  </div>
                </div>
              )}
              {formData.calories && (
                <div className="meta-item">
                  <i className="fa fa-heartbeat"></i>
                  <div>
                    <small>Calories</small>
                    <strong>{formData.calories} kcal</strong>
                  </div>
                </div>
              )}
              {formData.difficulty && (
                <div className="meta-item">
                  <i className="fa fa-signal"></i>
                  <div>
                    <small>Độ khó</small>
                    <strong>{getDifficultyText()}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {formData.ingredients.some((ing) => ing.trim()) && (
          <div className="preview-section">
            <h5>
              <i className="fa fa-list"></i> Nguyên liệu
            </h5>
            <ul className="ingredients-list">
              {formData.ingredients
                .filter((ing) => ing.trim())
                .map((ingredient, index) => (
                  <li key={index}>
                    <i className="fa fa-check"></i> {ingredient}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {formData.directions.some((dir) => dir.trim()) && (
          <div className="preview-section">
            <h5>
              <i className="fa fa-book"></i> Hướng dẫn
            </h5>
            <ol className="directions-list">
              {formData.directions
                .filter((dir) => dir.trim())
                .map((direction, index) => (
                  <li key={index}>
                    <div dangerouslySetInnerHTML={{ __html: direction }} />
                  </li>
                ))}
            </ol>
          </div>
        )}

        {formData.tags && (
          <div className="preview-section">
            <h5>
              <i className="fa fa-tags"></i> Tags
            </h5>
            <div className="tags-container">
              {formData.tags.split(",").map((tag, index) => (
                <span key={index} className="tag-item">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipePreview;
