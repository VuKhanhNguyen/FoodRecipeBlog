import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/img/logo.png';
import category3 from '../../assets/img/categories/3.jpg';
import category2 from '../../assets/img/categories/2.jpg';
import HomePage from '../../pages/HomePage';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const username = localStorage.getItem('username');
    setIsLoggedIn(!!username);

    // Đóng dropdown khi click bên ngoài
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
  };
  const handleCategoriesClick = (e) => {
    e.preventDefault();
    navigate('/recipe-categories');
  };
 const handleRecipeGridClick = (e) => {
    e.preventDefault();
    navigate('/recipe-grid');
  };
  const handleRecipeDetailClick = (e) => {
    e.preventDefault();
    navigate('/recipe-detail');
  }
  const handleTeamClick = (e) => {
    e.preventDefault();
    navigate('/team');
  }

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      // Nếu đã đăng nhập, toggle dropdown
      setShowDropdown(!showDropdown);
    } else {
      // Nếu chưa đăng nhập, chuyển đến trang login
      navigate('/login');
    }
  }

  const handleLogout = () => {
    const confirmLogout = window.confirm('Bạn có muốn đăng xuất không?');
    if (confirmLogout) {
      localStorage.removeItem('username');
      setIsLoggedIn(false);
      setShowDropdown(false);
      alert('Đăng xuất thành công!');
      navigate('/');
    }
  }

  const handleSettings = () => {
    setShowDropdown(false);
    // Có thể navigate đến trang cài đặt sau
    alert('Chức năng cài đặt đang được phát triển!');
  }

  const handleRecipeSubmit = () => {
    setShowDropdown(false);
    navigate('/recipe-submit');
  }

  return (
    <header className="metro_header header-1 can-sticky">
      {/* Middle Header */}
      <div className="metro_header-middle">
        <div className="container">
          <nav className="navbar">
            <ul className="navbar-nav">
              <li className="menu-item"> <a href="Đội ngũ.html">Đội ngũ</a> </li>
              <li className="menu-item"> <a href="contact-us.html">Liên hệ</a> </li>
            </ul>
            {/* Logo */}
            <a className="navbar-brand" href="index.html"> 
              <img src={logo} alt="logo" /> 
            </a>
            {/* Controls */}
            <div className="metro_header-controls">
              <div className="user-menu-wrapper" ref={dropdownRef}>
                <a href="#" onClick={handleLoginClick} className="metro_btn-custom">
                  <i className="fa fa-user"></i> {localStorage.getItem('username') || 'Đăng nhập'}
                  {isLoggedIn && <i className="fa fa-chevron-down" style={{marginLeft: '8px', fontSize: '12px'}}></i>}
                </a>
                {isLoggedIn && showDropdown && (
                  <div className="user-dropdown-menu">
                    <a href="#" onClick={handleRecipeManage} className="dropdown-item">
                      <i className="fa fa-utensils"></i> Quản lý công thức
                    </a>
                    <a href="#" onClick={handleSettings} className="dropdown-item">
                      <i className="fa fa-cog"></i> Cài đặt
                    </a>
                    <a href="#" onClick={handleLogout} className="dropdown-item">
                      <i className="fa fa-sign-out-alt"></i> Đăng xuất
                    </a>
                  </div>
                )}
              </div>
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
              <a href="#" onClick={handleHomeClick}>Trang chủ</a>
              
            </li>
            {/* <li className="menu-item menu-item-has-children">
              <a href="#">Blog</a>
              <ul className="sub-menu">
                <li className="menu-item"> <a href="blog-grid.html">Blog Archive</a> </li>
                <li className="menu-item"> <a href="blog-details.html">Blog Details</a> </li>
              </ul>
            </li> */}
            <li className="menu-item menu-item-has-children">
              <a href="#">Shop</a>
              <ul className="sub-menu">
                <li className="menu-item"> <a href="shop.html">Shop Catalog</a> </li>
                <li className="menu-item"> <a href="cart.html">Giỏ hàng</a> </li>
                <li className="menu-item"> <a href="checkout.html">Thanh toán</a> </li>
                <li className="menu-item"> <a href="product-details.html">Chi tiết sản phẩm</a> </li>
              </ul>
            </li>
            <li className="menu-item menu-item-has-children mega-menu-wrapper">
              <a href="#">Công thức</a>
              <ul className="sub-menu">
                <li>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="mega-menu-item">
                          <h6>Trang công thức</h6>
                          <a href="#" onClick={handleRecipeGridClick}>Blog công thức</a>
                          <a href="#" onClick={handleRecipeDetailClick}>Công thức chi tiết</a>
                          <a href="#" onClick={handleCategoriesClick}>Danh mục công thức</a>
                          <a href="recipe-authors.html">Tác giả công thức</a>
                          <a href="#" onClick={handleRecipeSubmit}>Quản lý công thức</a>
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
              <a href="#">Khác</a>
              <ul className="sub-menu">
                <li className="menu-item"> <a href="contact-us.html">Liên hệ</a> </li>

                <li className="menu-item"> <a href="#" onClick={handleTeamClick}>Đội ngũ</a> </li>
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