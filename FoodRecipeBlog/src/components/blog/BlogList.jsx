import React, { useState } from "react";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || blog.category === filterCategory;
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
