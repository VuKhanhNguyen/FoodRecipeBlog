import React from 'react';
import subheaderImg from '../../assets/img/subheader.jpg';

const SubmitBlogRecipeBanner = () => {
  return (
      <div className="metro_subheader dark-overlay dark-overlay-2" style={{backgroundImage: `url(${subheaderImg})`}}>
        <div className="container">
          <div className="metro_subheader-inner">
            <h1>Quản lý công thức</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                <li className="breadcrumb-item active" aria-current="page">Quản lý công thức</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
  );
};

export default SubmitBlogRecipeBanner;