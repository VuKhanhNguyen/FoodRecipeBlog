import React from 'react';
import EntryContent from './EntryContent';
import recipe1 from '../../assets/img/recipe/1.jpg';

const Content = () => {
return (
<div className="metro_post-single-wrapper metro_recipe-single-wrapper">

            <h2 className="entry-title">Planting Season Begins</h2>
            <div className="metro_rating-wrapper">
              <div className="metro_rating">
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star"></i>
              </div>
              <span>4 Stars</span>
            </div>

            <div className="metro_post-single-thumb">
              <img src={recipe1} alt="post" />
              <div className="metro_post-date">
                <span>25</span>
                <span>Dec</span>
              </div>
            </div>
{/* Entry Content Component */}
<EntryContent />
</div>
);
};
export default Content;