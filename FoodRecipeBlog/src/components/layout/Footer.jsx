import React from 'react';
import logolight from '../../assets/img/logo-light.png';
import blog1 from '../../assets/img/blog/1.jpg';
import blog2 from '../../assets/img/blog/2.jpg';

const Footer = () => {
  return (
<footer className="metro_footer metro_footer-dark">

    <span className="metro_footer-watermark">Restaurant</span>

    {/* <!-- Top Footer --> */}
    <div className="container">
      <div className="metro_footer-top">
        <div className="metro_footer-logo">
          <img src={logolight} alt="logo" />
        </div>
      </div>
    </div>

    {/* <!-- Middle Footer --> */}
    <div className="metro_footer-middle">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12 footer-widget">
            <h5 className="widget-title">Về chúng tôi</h5>
            <p>Sorem ipsum dolor amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            <ul className="social-media">
              <li> <a href="#" className="facebook"> <i className="fab fa-facebook-f"></i> </a> </li>
              <li> <a href="#" className="pinterest"> <i className="fab fa-pinterest-p"></i> </a> </li>
              <li> <a href="#" className="google"> <i className="fab fa-google"></i> </a> </li>
              <li> <a href="#" className="twitter"> <i className="fab fa-twitter"></i> </a> </li>
            </ul>
          </div>
          <div className="offset-lg-2 col-lg-3 col-md-12 col-sm-12 footer-widget">
            <h5 className="widget-title">Liên kết nhanh</h5>
            <ul>
              <li> <a href="blog-grid.html">Tin mới nhất</a> </li>
              <li> <a href="recipe-grid.html">Công thức nấu ăn</a> </li>
              <li> <a href="shop.html">Sản phẩm của chúng tôi</a> </li>
              <li> <a href="recipe-authors.html">Tác giả của chúng tôi</a> </li>
              <li> <a href="recipe-details">Chi tiết công thức</a> </li>
            </ul>
          </div>
          <div className="offset-lg-1 col-lg-3 col-md-12 col-sm-12 footer-widget widget-recent-posts">
            <h5 className="widget-title">Công thức gần đây</h5>
            <article className="post">
              <a href="blog-details.html"><img src={blog1} alt="post" /></a>
              <div className="post-content">
                <a href="#"> Burgers </a>
                <h6> <a href="blog-details.html">Tomato Stuffing with Cumin and Radish</a> </h6>
              </div>
            </article>
            <article className="post">
              <a href="blog-details.html"><img src={blog2} alt="post" /></a>
              <div className="post-content">
                <a href="#"> Pizza </a>
                <h6> <a href="blog-details.html">Tomato Stuffing with Cumin and Radish</a> </h6>
              </div>
            </article>
          </div>

        </div>
      </div>
    </div>

    {/* <!-- Footer Bottom --> */}
    <div className="metro_footer-bottom">
      <div className="container">
        <div className="metro_footer-copyright">
          <p> Copyright © 2025 <a href="#">TrioForce Off 1</a> All Rights Reserved. </p>
        </div>
      </div>
    </div>

  </footer>
  );
};

export default Footer;