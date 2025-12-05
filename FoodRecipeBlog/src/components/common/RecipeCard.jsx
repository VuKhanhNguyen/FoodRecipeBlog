import React from 'react';
import recipe1 from '../../assets/img/recipes/1.jpg';
import recipe2 from '../../assets/img/recipes/2.jpg';
import recipe3 from '../../assets/img/recipes/3.jpg';
import recipe4 from '../../assets/img/recipes/4.jpg';
import { useNavigate } from 'react-router-dom';
import RecipeDetailPage from '../../pages/RecipeDetailPage.jsx';

const RecipeCard = ({recipeId}) => {
  const navigate = useNavigate();

  const handleRecipeClick = () => {
    navigate(`/recipe/${recipeId || 1}`);
  };

  const handleExpertClick = (e) => {
    e.preventDefault();
    navigate('/recipe-detail');
  };
  return (
                <article className="metro_post metro_recipe">
                  <div className="metro_post-thumb">
                    <a href="#" onClick={handleRecipeClick}>
                      <img src={recipe1} alt="recipe"/>
                    </a>
                  </div>
                  <div className="metro_post-body">
                    <div className="metro_post-desc">
                      <span className="metro_post-meta"> <a href="#"> <i className="far fa-clock"></i> 45 phút </a> <a href="#" onClick={handleExpertClick}> <i className="far fa-knife-kitchen"></i> Chuyên gia</a> </span>
                      <h5> <a href="recipe-details.html">Cheese Burger With a Touch of Curry and Cumin</a> </h5>
                      <p>Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>
                    </div>
                    <div className="metro_rating mb-0">
                      <i className="fa fa-star active"></i>
                      <i className="fa fa-star active"></i>
                      <i className="fa fa-star active"></i>
                      <i className="fa fa-star active"></i>
                      <i className="fa fa-star"></i>
                    </div>
                  </div>
                </article>
           
              
          );
          };
export default RecipeCard;