import React from 'react'; 
import author1 from '../../assets/img/authors/1.jpg';

{/* Widget Author */}
const WidgetAuthor = () => {
  return (
        <div className="sidebar-widget widget-about-author">
           <div className="widget-about-author-inner">
                <img src={author1} alt="author"/>
                <h5>Micheal</h5>
                <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit</p>
              </div>
              <ul className="metro_sm">
                <li> <a href="#"> <i className="fab fa-facebook-f"></i> </a> </li>
                <li> <a href="#"> <i className="fab fa-twitter"></i> </a> </li>
                <li> <a href="#"> <i className="fab fa-linkedin-in"></i> </a> </li>
                <li> <a href="#"> <i className="fab fa-youtube"></i> </a> </li>
              </ul>
        </div>
  );
};

export default WidgetAuthor;