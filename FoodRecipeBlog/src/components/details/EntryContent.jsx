import React from "react";

const EntryContent = ({ recipeData }) => {
  if (!recipeData) return null;

  const getTotalTime = () => {
    const prep = parseInt(recipeData.prepTime) || 0;
    const cook = parseInt(recipeData.cookTime) || 0;
    return prep + cook;
  };

  const getDifficultyText = () => {
    switch (recipeData.difficulty) {
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
    <div className="entry-content">
      {/* Recipe Meta Info */}
      <span className="metro_post-meta">
        <a href="#">
          {" "}
          <i className="far fa-user"></i> {recipeData.author}{" "}
        </a>
        <a href="#">
          {" "}
          <i className="far fa-comment"></i> {recipeData.comments} Comments
        </a>
        <a href="#">
          {" "}
          <i className="far fa-clock"></i> {getTotalTime()} minutes
        </a>
      </span>

      {/* Category Badge */}
      {recipeData.category && (
        <div
          className="recipe-category-badge"
          style={{
            display: "inline-block",
            padding: "8px 16px",
            background: "#fff5f5",
            color: "#ff0005",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          <i className="fa fa-tag"></i> {recipeData.category}
        </div>
      )}

      {/* Description with HTML */}
      <div
        className="recipe-description"
        dangerouslySetInnerHTML={{ __html: recipeData.description }}
        style={{ marginBottom: "30px" }}
      />

      {/* Recipe Details Grid */}
      <div
        className="recipe-details-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
          marginBottom: "30px",
          padding: "20px",
          background: "#f8f9fa",
          borderRadius: "10px",
        }}
      >
        {recipeData.prepTime && (
          <div className="detail-item" style={{ textAlign: "center" }}>
            <i
              className="fa fa-clock"
              style={{
                fontSize: "24px",
                color: "#ff0005",
                marginBottom: "8px",
              }}
            ></i>
            <div
              style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}
            >
              CHUẨN BỊ
            </div>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}>
              {recipeData.prepTime} phút
            </div>
          </div>
        )}
        {recipeData.cookTime && (
          <div className="detail-item" style={{ textAlign: "center" }}>
            <i
              className="fa fa-fire"
              style={{
                fontSize: "24px",
                color: "#ff0005",
                marginBottom: "8px",
              }}
            ></i>
            <div
              style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}
            >
              NẤU
            </div>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}>
              {recipeData.cookTime} phút
            </div>
          </div>
        )}
        {recipeData.servings && (
          <div className="detail-item" style={{ textAlign: "center" }}>
            <i
              className="fa fa-users"
              style={{
                fontSize: "24px",
                color: "#ff0005",
                marginBottom: "8px",
              }}
            ></i>
            <div
              style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}
            >
              KHẨU PHẦN
            </div>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}>
              {recipeData.servings} người
            </div>
          </div>
        )}
        {recipeData.calories && (
          <div className="detail-item" style={{ textAlign: "center" }}>
            <i
              className="fa fa-heartbeat"
              style={{
                fontSize: "24px",
                color: "#ff0005",
                marginBottom: "8px",
              }}
            ></i>
            <div
              style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}
            >
              CALORIES
            </div>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}>
              {recipeData.calories} kcal
            </div>
          </div>
        )}
        {recipeData.difficulty && (
          <div className="detail-item" style={{ textAlign: "center" }}>
            <i
              className="fa fa-signal"
              style={{
                fontSize: "24px",
                color: "#ff0005",
                marginBottom: "8px",
              }}
            ></i>
            <div
              style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}
            >
              ĐỘ KHÓ
            </div>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}>
              {getDifficultyText()}
            </div>
          </div>
        )}
      </div>

      {/* Ingredients and Nutrition Side by Side */}
      <div className="row">
        <div className="col-lg-7">
          <div className="metro_ingredients">
            <h4>
              <i
                className="fa fa-list"
                style={{ color: "#ff0005", marginRight: "10px" }}
              ></i>
              Nguyên liệu
            </h4>
            <ul>
              {recipeData.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <i
                    className="fa fa-check"
                    style={{ color: "#ff0005", marginRight: "8px" }}
                  ></i>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="metro_nutritional-facts">
            <h4>
              <i
                className="fa fa-chart-pie"
                style={{ color: "#ff0005", marginRight: "10px" }}
              ></i>
              Dinh dưỡng
            </h4>
            <ul>
              <li>
                {" "}
                Calories <span>{recipeData.calories || "N/A"}</span>{" "}
              </li>
              <li>
                {" "}
                Protein <span>22.5g</span>{" "}
              </li>
              <li>
                {" "}
                Carbs <span>45g</span>{" "}
              </li>
              <li>
                {" "}
                Fat <span>12g</span>{" "}
              </li>
              <li>
                {" "}
                Fiber <span>5g</span>{" "}
              </li>
              <li>
                {" "}
                Sugar <span>8g</span>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cooking Directions */}
      <div className="cooking-directions" style={{ marginTop: "40px" }}>
        <h4
          style={{
            color: "#222",
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "25px",
            borderBottom: "3px solid #ff0005",
            paddingBottom: "10px",
            display: "inline-block",
          }}
        >
          <i
            className="fa fa-book"
            style={{ color: "#ff0005", marginRight: "10px" }}
          ></i>
          Hướng dẫn nấu
        </h4>
        <ol
          className="directions-list"
          style={{
            paddingLeft: "0",
            listStyle: "none",
            counterReset: "step-counter",
          }}
        >
          {recipeData.directions.map((direction, index) => (
            <li
              key={index}
              style={{
                counterIncrement: "step-counter",
                marginBottom: "25px",
                padding: "20px",
                background: "#f8f9fa",
                borderRadius: "10px",
                position: "relative",
                paddingLeft: "70px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "20px",
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #ff0005, #bc0004)",
                  color: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {index + 1}
              </div>
              <div dangerouslySetInnerHTML={{ __html: direction }} />
            </li>
          ))}
        </ol>
      </div>

      {/* Tags */}
      {recipeData.tags && (
        <div className="recipe-tags" style={{ marginTop: "30px" }}>
          <h5 style={{ marginBottom: "15px", color: "#333" }}>
            <i
              className="fa fa-tags"
              style={{ color: "#ff0005", marginRight: "8px" }}
            ></i>
            Tags
          </h5>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {recipeData.tags.split(",").map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: "6px 14px",
                  background: "#f0f0f0",
                  color: "#555",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                }}
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryContent;
