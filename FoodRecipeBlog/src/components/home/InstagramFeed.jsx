import React from 'react';
import ig1 from '../../assets/img/ig/1.jpg';
import ig2 from '../../assets/img/ig/2.jpg';
import ig3 from '../../assets/img/ig/3.jpg';
import ig4 from '../../assets/img/ig/4.jpg';
import ig5 from '../../assets/img/ig/5.jpg';
import ig6 from '../../assets/img/ig/6.jpg';

const InstagramFeed = () => {
  return (
    
 <div className="row no-gutters">
    <div className="col-lg-2 col-md-4 col-sm-4 col-6 p-0">
      <a href={ig1} className="gallery-thumb metro_ig-item">
        <img src={ig1} alt="ig" />
      </a>
    </div>
    <div className="col-lg-2 col-md-4 col-sm-4 col-6 p-0">
      <a href={ig2} className="gallery-thumb metro_ig-item">
        <img src={ig2} alt="ig" />
      </a>
    </div>
    <div className="col-lg-2 col-md-4 col-sm-4 col-6 p-0">
      <a href={ig3} className="gallery-thumb metro_ig-item">
        <img src={ig3} alt="ig" />
      </a>
    </div>
    <div className="col-lg-2 col-md-4 col-sm-4 col-6 p-0">
      <a href={ig4} className="gallery-thumb metro_ig-item">
        <img src={ig4} alt="ig" />
      </a>
    </div>
    <div className="col-lg-2 col-md-4 col-sm-4 col-6 p-0">
      <a href={ig5} className="gallery-thumb metro_ig-item">
        <img src={ig5} alt="ig" />
      </a>
    </div>
    <div className="col-lg-2 col-md-4 col-sm-4 col-6 p-0">
      <a href={ig6} className="gallery-thumb metro_ig-item">
        <img src={ig6} alt="ig" />
      </a>
    </div>
  </div>

  );
};
  
export default InstagramFeed;