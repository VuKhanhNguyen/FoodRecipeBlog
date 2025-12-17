import React, { useEffect, useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import recipeService from "../../services/recipeService";

const BlogList = ({ blogs, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [catsError, setCatsError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadCategories = async () => {
      try {
        setLoadingCats(true);
        const data = await recipeService.getAllCategories();
        if (!mounted) return;
        setCategories(Array.isArray(data?.categories) ? data.categories : []);
      } catch (e) {
        if (!mounted) return;
        setCatsError(e?.message || "Không thể tải danh mục");
      } finally {
        if (mounted) setLoadingCats(false);
      }
    };
    loadCategories();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const blogCategoryName =
      typeof blog.category === "object"
        ? blog.category?.name ||
          blog.category?.label ||
          blog.category?._id ||
          blog.category?.id ||
          ""
        : blog.category || "";
    const matchesCategory =
      filterCategory === "all" || blogCategoryName === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="blog-list-container">
      {/* Search and Filter Bar */}
      <div className="blog-list-header">
        <div className="search-filter-bar">
          <div className="search-box">
            <i className="fa fa-search"></i>
            <input
              type="text"
              placeholder="Tìm kiếm blog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-box">
            <i className="fa fa-filter"></i>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((c) => (
                <option key={c._id || c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="blog-count">
          <span>
            Tìm thấy <strong>{filteredBlogs.length}</strong> blog
          </span>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="blog-grid">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="no-blogs">
            <i className="fa fa-inbox"></i>
            <p>Không tìm thấy blog nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
