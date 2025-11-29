import React from 'react';
import video1 from '../../assets/img/recipes/video/1.jpg';
import video2 from '../../assets/img/recipes/video/2.jpg';
import video3 from '../../assets/img/recipes/video/3.jpg';
import video4 from '../../assets/img/recipes/video/4.jpg';
import video5 from '../../assets/img/recipes/video/5.jpg';

const VideoRecipes = () => {
  return (
<div className="section section-padding pt-0">

            <div className="section-title flex-title">
              <h4 className="title">Watch Video Recipes</h4>
              <a href="recipe-grid.html" className="btn-link"> View All Recipes <i className="fas fa-arrow-right"></i>  </a>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="metro_recipe metro_recipe-video metro_recipe-video-main">
                  <img src={video1} alt="Recipe"/>
                  <a href="https://www.youtube.com/watch?v=TKnufs85hXk" className="popup-youtube"> <i className="far fa-play"></i> </a>
                  <div className="metro_recipe-video-content">
                    <span className="metro_post-meta"> <a href="#"> <i className="far fa-clock"></i> 45 Minutes </a> <a href="recipe-details.html"> <i className="far fa-knife-kitchen"></i> Expert</a> </span>
                    <h6>Tomatoes Stuffed with Foie and Chanterelles Mirage JS Deep Understanding Mirage</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="metro_recipe metro_recipe-video">
                  <img src={video2} alt="Recipe"/>
                  <a href="https://www.youtube.com/watch?v=TKnufs85hXk" className="popup-youtube"> <i className="far fa-play"></i> </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="metro_recipe metro_recipe-video">
                  <img src={video3} alt="Recipe"/>
                  <a href="https://www.youtube.com/watch?v=TKnufs85hXk" className="popup-youtube"> <i className="far fa-play"></i> </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="metro_recipe metro_recipe-video">
                  <img src={video4} alt="Recipe"/>
                  <a href="https://www.youtube.com/watch?v=TKnufs85hXk" className="popup-youtube"> <i className="far fa-play"></i> </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="metro_recipe metro_recipe-video">
                  <img src={video5} alt="Recipe"/>
                  <a href="https://www.youtube.com/watch?v=TKnufs85hXk" className="popup-youtube"> <i className="far fa-play"></i> </a>
                </div>
              </div>
            </div>

          </div>
          );
          };
export default VideoRecipes;