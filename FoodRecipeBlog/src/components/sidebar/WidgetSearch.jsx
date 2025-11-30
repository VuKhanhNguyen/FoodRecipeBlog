import React from 'react';

const WidgetSearch = () => {
  return (
<div className="sidebar-widget widget-search">
    <form method="post">
        <div className="metro_search-adv-input">
            <input type="text" className="form-control" placeholder="Look for Fruits, Vegetables" name="search" defaultValue=""/>
            <button type="submit" name="button"><i className="fa fa-search"></i></button>
        </div>
    </form>
</div>
  );
};
export default WidgetSearch;