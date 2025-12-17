import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
{
  /* Widget Categories */
}
const WidgetCategories = () => {
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
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();

        // Kiểm tra nếu data là array, nếu không thì lấy data.categories hoặc data.data
        const categoriesArray = Array.isArray(data)
          ? data
          : data.categories || data.data || [];

        setCategories(categoriesArray);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="sidebar-widget">
        <h5 className="widget-title"> Bài viết theo danh mục </h5>
        <p>Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sidebar-widget">
        <h5 className="widget-title"> Bài viết theo danh mục </h5>
        <p>Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="sidebar-widget">
      <h5 className="widget-title"> Bài viết theo danh mục </h5>
      <ul className="sidebar-widget-list">
        {categories.map((category) => (
          <li key={category._id}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/recipe-grid/${encodeURIComponent(category.name)}`);
              }}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetCategories;
