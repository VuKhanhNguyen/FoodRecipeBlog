import React from 'react';
import logo from '../../assets/img/logo.png';
import category3 from '../../assets/img/categories/3.jpg';
import category2 from '../../assets/img/categories/2.jpg';

const Header = () => {
  return (
    <header className="metro_header header-1 can-sticky">
      {/* Middle Header */}
      <div className="metro_header-middle">
        <div className="container">
          <nav className="navbar">
            <ul className="navbar-nav">
              <li className="menu-item"> <a href="team.html">Team</a> </li>
              <li className="menu-item"> <a href="contact-us.html">Contact Us</a> </li>
            </ul>
            {/* Logo */}
            <a className="navbar-brand" href="index.html"> 
              <img src={logo} alt="logo" /> 
            </a>
            {/* Controls */}
            <div className="metro_header-controls">
              <a href="recipe-submit.html" className="metro_btn-custom">Submit Recipe</a>
              <div className="aside-toggler aside-trigger-left">
                <span></span><span></span><span></span>
              </div>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Bottom Header (Menu chính) */}
      <div className="metro_header-bottom">
        <div className="container">
          <div className="metro_header-bottom-inner">
             {/* Side navigation toggle */}
          <div className="aside-toggler aside-trigger-right desktop-toggler">
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/*  Menu  */}
          <ul className="navbar-nav">
            <li className="menu-item menu-item-has-children">
              <a href="#">Home Pages</a>
              
            </li>
            <li className="menu-item menu-item-has-children">
              <a href="#">Blog</a>
              <ul className="sub-menu">
                <li className="menu-item"> <a href="blog-grid.html">Blog Archive</a> </li>
                <li className="menu-item"> <a href="blog-details.html">Blog Details</a> </li>
              </ul>
            </li>
            <li className="menu-item menu-item-has-children">
              <a href="#">Shop</a>
              <ul className="sub-menu">
                <li className="menu-item"> <a href="shop.html">Shop Catalog</a> </li>
                <li className="menu-item"> <a href="cart.html">Cart</a> </li>
                <li className="menu-item"> <a href="checkout.html">Checkout</a> </li>
                <li className="menu-item"> <a href="product-details.html">Product Details</a> </li>
              </ul>
            </li>
            <li className="menu-item menu-item-has-children mega-menu-wrapper">
              <a href="#">Recipes</a>
              <ul className="sub-menu">
                <li>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="mega-menu-item">
                          <h6>Recipe Pages</h6>
                          <a href="recipe-grid.html">Recipe Archive</a>
                          <a href="recipe-details.html">Recipe Details</a>
                          <a href="recipe-categories.html">Recipe Categories</a>
                          <a href="recipe-authors.html">Recipe Authors</a>
                          <a href="recipe-submit.html">Submit Recipe</a>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mega-menu-item">
                          <a href="recipe-grid.html" className="metro_recipe-category">
                            <div className="metro_recipe-category-thumb">
                              <img src={category3} alt="Recipe Category"/>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mega-menu-item">
                          <a href="recipe-grid.html" className="metro_recipe-category">
                            <div className="metro_recipe-category-thumb">
                              <img src={category2} alt="Recipe Category"/>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                </li>
              </ul>
            </li>
            <li className="menu-item menu-item-has-children">
              <a href="#">Pages</a>
              <ul className="sub-menu">
                <li className="menu-item"> <a href="contact-us.html">Contact Us</a> </li>

                <li className="menu-item"> <a href="team.html">Team</a> </li>
              </ul>
            </li>
          </ul>

          <ul className="metro_header-bottom-sm metro_sm">
            <li> <a href="#"> <i className="fab fa-facebook-f"></i> </a> </li>
            <li> <a href="#"> <i className="fab fa-twitter"></i> </a> </li>
            <li> <a href="#"> <i className="fab fa-linkedin-in"></i> </a> </li>
            <li> <a href="#"> <i className="fab fa-youtube"></i> </a> </li>
          </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;