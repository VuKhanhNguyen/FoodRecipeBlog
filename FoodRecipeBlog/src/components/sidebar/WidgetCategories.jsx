import React from 'react'; 
 {/* Widget Categories */}
const WidgetCategories = () => {
  return (
         <div className="sidebar-widget">
              <h5 className="widget-title"> Post Categories </h5>
              <ul className="sidebar-widget-list">
                <li> <a href="#"> Vegan </a> </li>
                <li> <a href="#"> Breakfast </a> </li>
                <li> <a href="#"> Pizza </a> </li>
                <li> <a href="#"> Salads</a> </li>
                <li> <a href="#"> Drinks  </a> </li>
                <li> <a href="#"> Bread </a> </li>
                <li> <a href="#"> Lunch </a> </li>
                <li> <a href="#"> Dinner </a> </li>
              </ul>
        </div>    
  );
};

export default WidgetCategories;