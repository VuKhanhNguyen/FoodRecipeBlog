import React from 'react';
import blog1 from '../../assets/img/blog/1.jpg';

{/* Widget Recent Posts */}
const WidgetRecentPost = () => {
  return (
        <div className="sidebar-widget widget-recent-posts">
           <h5 className="widget-title">Recent Posts</h5>
           {/* Có thể map mảng data để render danh sách bài viết nhỏ */}
           <article className="post">
              <a href="blog-details.html"><img src={blog1} alt="post"/></a>
                <div className="post-content">
                  <a href="#"> Burgers </a>
                  <h6> <a href="blog-details.html">Tomato Stuffing with Cumin and Radish</a> </h6>
                </div>
           </article>
        </div>
  );
};

export default WidgetRecentPost;