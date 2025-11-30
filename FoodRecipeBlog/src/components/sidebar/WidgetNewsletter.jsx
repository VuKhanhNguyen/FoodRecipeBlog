import React from 'react'; 
{/* Widget Newsletter */}
const WidgetNewsletter = () => {
  return (
         <div className="sidebar-widget">
              <div className="metro_newsletter-form">
                <h5>Tin tức</h5>
                <p>Nhận các công thức nấu ăn độc quyền hàng tuần với bản tin của chúng tôi</p>
                <form method="post" className="metro_comments-form p-0 border-0">
                  <div className="form-group">
                    <input type="email" className="form-control" name="newsletter_email" placeholder="Địa chỉ email" defaultValue=""/>
                    <i className="far fa-envelope"></i>
                  </div>
                  <button type="submit" className="metro_btn-custom" name="button">Đăng ký ngay</button>
                </form>
              </div>
        </div>
  );
};

export default WidgetNewsletter;