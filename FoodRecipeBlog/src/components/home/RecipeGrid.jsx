import React from 'react';
import categories1 from '../../assets/img/categories/lg/1.jpg';
import categories2 from '../../assets/img/categories/lg/2.jpg';
import categories3 from '../../assets/img/categories/lg/3.jpg';
import categories4 from '../../assets/img/categories/lg/4.jpg';

const RecipeGrid = () => {
  return ( 
 <div className="section section-padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-7">
          <a href="recipe-grid.html" className="metro_recipe-category style-2">
            <img src={categories1} alt="category"/>
            <h4>Pizza</h4>
          </a>
        </div>
        <div className="col-lg-5">
          <a href="recipe-grid.html" className="metro_recipe-category style-2">
            <img src={categories2} alt="category"/>
            <h4>Burger</h4>
          </a>
        </div>
        <div className="col-lg-5">
          <a href="recipe-grid.html" className="metro_recipe-category style-2">
            <img src={categories3} alt="category"/>
            <h4>Chicken</h4>
          </a>
        </div>
        <div className="col-lg-7">
          <a href="recipe-grid.html" className="metro_recipe-category style-2">
            <img src={categories4} alt="category"/>
            <h4>Soup</h4>
          </a>
        </div>
      </div>
    </div>
  </div>
  );
  };
export default RecipeGrid;