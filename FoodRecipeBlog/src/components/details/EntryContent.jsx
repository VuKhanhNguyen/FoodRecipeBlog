import React from 'react';
import recipe2 from '../../assets/img/recipe/2.jpg';
import recipe3 from '../../assets/img/recipe/3.jpg';

const EntryContent = () => {
  return (
<div className="entry-content">
              <span className="metro_post-meta">
                <a href="#"> <i className="far fa-user"></i> Michel </a>
                <a href="blog-details.html"> <i className="far fa-knife-kitchen"></i> 5 Comments</a>
                <a href="blog-details.html"> <i className="far fa-clock"></i> 55 minutes</a>
              </span>

              <p>
                Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada.
                Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada.
                Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada.
                Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada.
              </p>

              <div className="row">
                <div className="col-lg-6">
                  <div className="metro_nutritional-facts">
                    <h4>Nutrition</h4>
                    <ul>
                      <li> 1 Cup Sifted all purpose Flour </li>
                      <li> 4 Cups Dry-roasted macadamia nuts </li>
                      <li> 4 Large eggs </li>
                      <li> 5 Cup sifted all purpose flour </li>
                      <li> 8 Cups dry-roasted macadami nuts </li>
                      <li> 5 Mineral water </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="metro_ingredients">
                    <h4>Ingredients</h4>
                    <ul>
                      <li> Calories <span>329</span> </li>
                      <li> Sugar <span>10.5g</span> </li>
                      <li> Protein <span>22.5g</span> </li>
                      <li> Fat <span>3g</span> </li>
                      <li> Carbs <span>18g</span> </li>
                      <li> Food Far <span>0.1</span> </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <img className="w-100" src={recipe2} alt="Recipe"/>
                </div>
                <div className="col-sm-6">
                  <img className="w-100" src={recipe3} alt="Recipe"/>
                </div>
              </div>

              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                Ut enim ad minima veniam, quis nostruercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequat
              </p>
</div>
);
};
export default EntryContent;