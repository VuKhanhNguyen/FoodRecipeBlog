import React from "react";
import author1 from "../../assets/img/authors/1.jpg";
const AuthorsCard = () => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="metro_recipe-author">
        <div className="metro_recipe-author-thumb">
          <img src={author1} alt="Recipe Author" />
        </div>
        <div className="metro_recipe-author-content">
          <h5>
            {" "}
            <a href="#">Larry M. Thompson</a>{" "}
          </h5>
          <span className="custom-primary">CEO & Founder</span>
          <div className="metro_recipe-author-stats">
            <div className="metro_recipe-author-stat">
              <h6>23</h6>
              <span className="custom-primary">Công thức</span>
            </div>
            <div className="metro_recipe-author-stat">
              <h6>50</h6>
              <span className="custom-primary">Đánh giá</span>
            </div>
            <div className="metro_recipe-author-stat">
              <h6>95</h6>
              <span className="custom-primary">Yêu thích</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthorsCard;
