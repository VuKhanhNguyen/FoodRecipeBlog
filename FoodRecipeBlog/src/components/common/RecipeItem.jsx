import React from 'react';
import recipe1 from '../../assets/img/recipes/1.jpg';
import recipe2 from '../../assets/img/recipes/2.jpg';
import recipe3 from '../../assets/img/recipes/3.jpg';
import recipe4 from '../../assets/img/recipes/4.jpg'; 
 
 const RecipeItem = () => {
    return(
 <article className="metro_post metro_recipe metro_recipe-2">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src={recipe1} alt="recipe"/>
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <span className="metro_post-meta"> 
                <a href="#"> <i className="far fa-clock"></i> 45 phút </a> 
                <a href="recipe-details.html"> <i className="far fa-knife-kitchen"></i> Chuyên gia</a> 
              </span>
              <h5> <a href="recipe-details.html">Cheese Burger With a Touch of Curry and Cumin</a> </h5>
            </div>
          </div>
        </article>

    );
};
export default RecipeItem;