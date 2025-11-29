import React from 'react';
import cta2 from '../../assets/img/sidebar-cta-2.jpg';

{/* Widget CTA */}
const WidgetCTA = () => {
  return (
        <div className="sidebar-widget sidebar-cta">
           <img src={cta2} alt="Call To Action" />
           <div className="sidebar-cta-content">
             <span>Good Food</span>
             <h6>Best Quality Food</h6>
             <a href="shop.html" className="metro_btn-custom">Shop Now</a>
           </div>
        </div>
  );
};

export default WidgetCTA;