import React from "react";
import cate9 from '../../assets/img/categories/9.jpg';

const RecipeCategories = () => { 
 
    return (
 
        <div className="col-md-4 col-sm-6">
          <a href="recipe-grid.html" className="metro_recipe-category">
            <div className="metro_recipe-category-thumb">
              <img src={cate9} alt="Recipe Category"/>
            </div>
            <div className="metro_recipe-category-content">
              <h5>Công Thức Gà</h5>
              <span className="custom-primary">Thức Ăn Nhanh</span>
            </div>
          </a>
        </div>
  );
};
export default RecipeCategories;