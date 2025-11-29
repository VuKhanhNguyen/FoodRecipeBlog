import React from 'react';
{/* Widget Social Links */}
const WidgetSocialLinks = () => {
  return (
         <div className="sidebar-widget">
              <h5 className="widget-title">Social Links</h5>
              <ul className="metro_sm">
                <li> <a href="#" className="facebook"> <i className="fab fa-facebook-f"></i> </a> </li>
                <li> <a href="#" className="twitter"> <i className="fab fa-twitter"></i> </a> </li>
                <li> <a href="#" className="linkedin"> <i className="fab fa-linkedin-in"></i> </a> </li>
                <li> <a href="#" className="youtube"> <i className="fab fa-youtube"></i> </a> </li>
              </ul>
        </div>
  );
};

export default WidgetSocialLinks;