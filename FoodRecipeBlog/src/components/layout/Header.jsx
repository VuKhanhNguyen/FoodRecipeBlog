import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/img/logo.png";
import category3 from "../../assets/img/categories/3.jpg";
import category2 from "../../assets/img/categories/2.jpg";
import HomePage from "../../pages/HomePage";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const dropdownRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập bằng authService
    const authenticated = authService.isAuthenticated();
    const user = authService.getCurrentUser();
    setIsLoggedIn(authenticated);
    setCurrentUser(user);

    // Đóng dropdown khi click bên ngoài
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const shouldStick = window.scrollY > 10;
      setIsSticky(shouldStick);
      if (bottomRef.current) {
        setHeaderHeight(bottomRef.current.offsetHeight || 0);
      }
    };

    const handleResize = () => {
      if (bottomRef.current) {
        setHeaderHeight(bottomRef.current.offsetHeight || 0);
      }
    };

    // Initialize on mount
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleCategoriesClick = (e) => {
    e.preventDefault();
    navigate("/recipe-categories");
  };
  const handleRecipeGridClick = (e) => {
    e.preventDefault();
    navigate("/recipe-grid");
  };
  const handleRecipeDetailClick = (e) => {
    e.preventDefault();
    navigate("/recipe-detail");
  };
  const handleTeamClick = (e) => {
    e.preventDefault();
    navigate("/team");
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      // Nếu đã đăng nhập, toggle dropdown
      setShowDropdown(!showDropdown);
    } else {
      // Nếu chưa đăng nhập, chuyển đến trang login
      navigate("/login");
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có muốn đăng xuất không?");
    if (confirmLogout) {
      authService.logout();
      setIsLoggedIn(false);
      setCurrentUser(null);
      setShowDropdown(false);
      alert("Đăng xuất thành công!");
      // authService.logout() đã tự động redirect về /login
    }
  };

  const handleSettings = () => {
    setShowDropdown(false);
    // Có thể navigate đến trang cài đặt sau
    alert("Chức năng cài đặt đang được phát triển!");
  };

  const handleRecipeSubmit = () => {
    setShowDropdown(false);
    navigate("/recipe-submit");
  };

  const handleRecipeManage = () => {
    setShowDropdown(false);
    navigate("/recipe-submit");
  };

  const handleBlogManage = () => {
    setShowDropdown(false);
    if (currentUser?.username === "admin") {
      navigate("/admin");
    } else {
      navigate("/blog-manage");
    }
  };

  const handleAuthorsClick = (e) => {
    e.preventDefault();
    navigate("/authors");
  };

  return (
    <>
      <header
        className={`metro_header header-1 can-sticky ${
          isSticky ? "sticky" : ""
        }`}
      >
        {/* Middle Header */}
        <div className="metro_header-middle">
          <div className="container">
            <nav className="navbar">
              <ul className="navbar-nav">
                <li className="menu-item">
                  {" "}
                  <a href="Đội ngũ.html">Đội ngũ</a>{" "}
                </li>
                <li className="menu-item">
                  {" "}
                  <a href="contact-us.html">Liên hệ</a>{" "}
                </li>
              </ul>
              {/* Logo */}
              <a className="navbar-brand" href="index.html">
                <img src={logo} alt="logo" />
              </a>
              {/* Controls */}
              <div className="metro_header-controls">
                <div className="user-menu-wrapper" ref={dropdownRef}>
                  <a
                    href="#"
                    onClick={handleLoginClick}
                    className="metro_btn-custom"
                  >
                    <i className="fa fa-user"></i>{" "}
                    {currentUser?.username ||
                      currentUser?.fullName ||
                      "Đăng nhập"}
                    {isLoggedIn && (
                      <i
                        className="fa fa-chevron-down"
                        style={{ marginLeft: "8px", fontSize: "12px" }}
                      ></i>
                    )}
                  </a>
                  {isLoggedIn && showDropdown && (
                    <div className="user-dropdown-menu">
                      <a
                        href="#"
                        onClick={handleRecipeManage}
                        className="dropdown-item"
                      >
                        <i className="fa fa-utensils"></i> Quản lý công thức
                      </a>
                      <a
                        href="#"
                        onClick={handleBlogManage}
                        className="dropdown-item"
                      >
                        <i className="fa fa-edit"></i> Quản lý blog
                      </a>
                      <a
                        href="#"
                        onClick={handleSettings}
                        className="dropdown-item"
                      >
                        <i className="fa fa-cog"></i> Cài đặt
                      </a>
                      <a
                        href="#"
                        onClick={handleLogout}
                        className="dropdown-item"
                      >
                        <i className="fa fa-sign-out-alt"></i> Đăng xuất
                      </a>
                    </div>
                  )}
                </div>
                <div className="aside-toggler aside-trigger-left">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Bottom Header (Menu chính) */}
        <div className="metro_header-bottom" ref={bottomRef}>
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
                  <a href="#" onClick={handleHomeClick}>
                    Trang chủ
                  </a>
                </li>
                {/* <li className="menu-item menu-item-has-children">
              <a href="#">Blog</a>
              <ul className="sub-menu">
                <li className="menu-item"> <a href="blog-grid.html">Blog Archive</a> </li>
                <li className="menu-item"> <a href="blog-details.html">Blog Details</a> </li>
              </ul>
            </li> */}

                <li className="menu-item menu-item-has-children mega-menu-wrapper">
                  <a href="#">Công thức</a>
                  <ul className="sub-menu">
                    <li>
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="mega-menu-item">
                              <h6>Trang công thức</h6>
                              <a href="#" onClick={handleRecipeGridClick}>
                                Blog công thức
                              </a>
                              <a href="#" onClick={handleRecipeDetailClick}>
                                Công thức chi tiết
                              </a>
                              <a href="#" onClick={handleCategoriesClick}>
                                Danh mục công thức
                              </a>
                              <a href="#" onClick={handleAuthorsClick}>
                                Tác giả công thức
                              </a>
                              <a href="#" onClick={handleBlogManage}>
                                Quản lý blog
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="mega-menu-item">
                              <a
                                href="recipe-grid.html"
                                className="metro_recipe-category"
                              >
                                <div className="metro_recipe-category-thumb">
                                  <img src={category3} alt="Recipe Category" />
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="mega-menu-item">
                              <a
                                href="recipe-grid.html"
                                className="metro_recipe-category"
                              >
                                <div className="metro_recipe-category-thumb">
                                  <img src={category2} alt="Recipe Category" />
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
                    <li className="menu-item">
                      {" "}
                      <a href="contact-us.html">Liên hệ</a>{" "}
                    </li>

                    <li className="menu-item">
                      {" "}
                      <a href="#" onClick={handleTeamClick}>
                        Đội ngũ
                      </a>{" "}
                    </li>
                  </ul>
                </li>
              </ul>

              <ul className="metro_header-bottom-sm metro_sm">
                <li>
                  {" "}
                  <a href="#">
                    {" "}
                    <i className="fab fa-facebook-f"></i>{" "}
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">
                    {" "}
                    <i className="fab fa-twitter"></i>{" "}
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">
                    {" "}
                    <i className="fab fa-linkedin-in"></i>{" "}
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">
                    {" "}
                    <i className="fab fa-youtube"></i>{" "}
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      {/* Spacer to avoid layout shift when header becomes fixed */}
      <div aria-hidden="true" style={{ height: isSticky ? headerHeight : 0 }} />
    </>
  );
};

export default Header;
