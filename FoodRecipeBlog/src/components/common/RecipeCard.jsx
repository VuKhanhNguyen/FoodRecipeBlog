import React from 'react';
import recipe1 from '../../assets/img/recipes/1.jpg';
import recipe2 from '../../assets/img/recipes/2.jpg';
import recipe3 from '../../assets/img/recipes/3.jpg';
import recipe4 from '../../assets/img/recipes/4.jpg';

const RecipeCard = () => {
  return (
                <article class="metro_post metro_recipe">
                  <div class="metro_post-thumb">
                    <a href="recipe-details.html">
                      <img src={recipe1} alt="recipe"/>
                    </a>
                  </div>
                  <div class="metro_post-body">
                    <div class="metro_post-desc">
                      <span class="metro_post-meta"> <a href="#"> <i class="far fa-clock"></i> 45 Minutes </a> <a href="recipe-details.html"> <i class="far fa-knife-kitchen"></i> Expert</a> </span>
                      <h5> <a href="recipe-details.html">Cheese Burger With a Touch of Curry and Cumin</a> </h5>
                      <p>Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>
                    </div>
                    <div class="metro_rating mb-0">
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star active"></i>
                      <i class="fa fa-star"></i>
                    </div>
                  </div>
                </article>
           
              
          );
          };
export default RecipeCard;