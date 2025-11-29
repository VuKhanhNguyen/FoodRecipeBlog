import React from 'react'; 
{/* Widget Newsletter */}
const WidgetNewsletter = () => {
  return (
         <div className="sidebar-widget">
              <div className="metro_newsletter-form">
                <h5>Newsletter</h5>
                <p>Get exclusive weekly recipes with our newsletter subscription</p>
                <form method="post" className="metro_comments-form p-0 border-0">
                  <div className="form-group">
                    <input type="email" className="form-control" name="newsletter_email" placeholder="Email Address" defaultValue=""/>
                    <i className="far fa-envelope"></i>
                  </div>
                  <button type="submit" className="metro_btn-custom" name="button">Subscribe Now</button>
                </form>
              </div>
        </div>
  );
};

export default WidgetNewsletter;