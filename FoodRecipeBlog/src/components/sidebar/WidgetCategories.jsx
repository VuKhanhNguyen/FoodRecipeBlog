import React from 'react'; 
 {/* Widget Categories */}
const WidgetCategories = () => {
  return (
         <div className="sidebar-widget">
              <h5 className="widget-title"> Bài viết theo danh mục </h5>
              <ul className="sidebar-widget-list">
                <li> <a href="#">Ăn chay</a> </li>
                <li> <a href="#">Bữa sáng</a> </li>
                <li> <a href="#">Pizza</a> </li>
                <li> <a href="#">Salad</a> </li>
                <li> <a href="#">Đồ uống</a> </li>
                <li> <a href="#">Bánh mì</a> </li>
                <li> <a href="#">Bữa trưa</a> </li>
                <li> <a href="#">Bữa tối</a> </li>
              </ul>
        </div>    
  );
};

export default WidgetCategories;