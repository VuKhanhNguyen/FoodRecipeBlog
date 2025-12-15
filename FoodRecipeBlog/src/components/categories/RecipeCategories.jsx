import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cate9 from "../../assets/img/categories/9.jpg";

const RecipeCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/categories/all"
        );
        if (!response.ok) {
          throw new Error("Không thể tải danh mục");
        }
        const data = await response.json();

        setCategories(data.categories);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="col-md-12">Đang tải danh mục...</div>;
  }

  if (error) {
    return <div className="col-md-12">Lỗi: {error}</div>;
  }

  return (
    <>
      {categories.map((category) => (
        <div key={category._id} className="col-md-4 col-sm-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/recipe-grid/${encodeURIComponent(category.name)}`);
            }}
            className="metro_recipe-category"
          >
            <div className="metro_recipe-category-thumb category-thumb-fixed">
              <img src={category.image || cate9} alt={category.name} />
            </div>
            <div className="metro_recipe-category-content">
              <h5>{category.name}</h5>
              <span className="custom-primary">
                {category.description || "Danh mục công thức"}
              </span>
            </div>
          </a>
        </div>
      ))}
    </>
  );
};
export default RecipeCategories;
