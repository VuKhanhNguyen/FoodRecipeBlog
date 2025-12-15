import React from "react";
import subheaderImg from "../../assets/img/subheader.jpg";

const RecipeBlogBanner = () => {
  return (
    <div
      className="metro_subheader dark-overlay dark-overlay-2"
      style={{ backgroundImage: `url(${subheaderImg})` }}
    >
      <div className="container">
        <div className="metro_subheader-inner">
          <h1>Blog Công Thức</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Trang chủ</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Blog Công Thức
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default RecipeBlogBanner;
