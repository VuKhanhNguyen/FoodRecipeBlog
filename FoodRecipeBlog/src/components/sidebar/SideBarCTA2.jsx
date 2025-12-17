import React from 'react';
import WidgetCTA from './WidgetCTA';
import WidgetAuthor from './WidgetAuthor';
import WidgetRecentPost from './WidgetRecentPost';
import WidgetCategories from './WidgetCategories';
import WidgetTestimonials from './WidgetTestimonials';
import WidgetNewsletter from './WidgetNewsletter';
import WidgetSocialLinks from './WidgetSocialLinks';
import WidgetTags from './WidgetTags';
import WidgetSearch from './WidgetSearch';

const Sidebar = () => {
  return (
    <div className="col-lg-4">
      <div className="sidebar">
        
        {/* gọi các widget vào đây */}
        <WidgetSearch />
        <WidgetCTA />
       
        <WidgetRecentPost />
 <WidgetCategories />
 <WidgetTestimonials />
  <WidgetNewsletter />
  <WidgetTags />
  <WidgetSocialLinks />
      </div>
    </div>
  );
};

export default Sidebar;