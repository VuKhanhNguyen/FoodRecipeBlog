import React from "react";
import subheaderImg from '../../assets/img/subheader.jpg';

const RecipeDetailBanner = () => {
  return (
<div className="metro_subheader dark-overlay dark-overlay-2" style={{backgroundImage: `url(${subheaderImg})`}}>
    <div className="container">
      <div className="metro_subheader-inner">
        <h1>Công Thức Chi Tiết</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
            <li className="breadcrumb-item active" aria-current="page">Công Thức Chi Tiết</li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
  );
};
export default RecipeDetailBanner;