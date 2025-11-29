import React, {useEffect, useRef} from 'react';
import recipe4 from '../../assets/img/recipes/4.jpg';
import recipe5 from '../../assets/img/recipes/5.jpg';
import recipe6 from '../../assets/img/recipes/6.jpg';
import recipe7 from '../../assets/img/recipes/7.jpg';

const FeaturedRecipe = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    // Đảm bảo jQuery và Slick đã được load
    if (typeof window.$ === 'undefined' || typeof window.$.fn.slick === 'undefined') {
      console.error('jQuery hoặc Slick slider chưa được load');
      return;
    }

    const initSlider = () => {
      const slider = window.$(sliderRef.current);
      
      if (slider.length > 0) {
        // Kiểm tra nếu slider đã được khởi tạo
        if (slider.hasClass('slick-initialized')) {
          slider.slick('unslick'); // Hủy slider cũ trước khi tạo mới
        }

        // Đợi một chút để DOM render hoàn toàn
        setTimeout(() => {
          try {
            slider.slick({
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: true,
              dots: false,
              autoplay: false,
              accessibility: true,
              prevArrow: '.metro_home-slider-wrapper-2 .slider-prev',
              nextArrow: '.metro_home-slider-wrapper-2 .slider-next',
              responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                  }
                },
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 575,
                  settings: {
                    slidesToShow: 1,
                  }
                }
              ]
            });
          } catch (error) {
            console.error('Lỗi khởi tạo Slick slider:', error);
          }
        }, 100);
      }
    };

    initSlider();

    // Cleanup function
    return () => {
      const slider = window.$(sliderRef.current);
      if (slider.length > 0 && slider.hasClass('slick-initialized')) {
        try {
          slider.slick('unslick');
        } catch (error) {
          console.error('Lỗi khi cleanup slider:', error);
        }
      }
    };
  }, []);

  return (
    <div className="section metro_home-slider-wrapper-2">
      <div className="section-title flex-title">
        <h4 className="title">Featured Recipes</h4>
        <div className="metro_arrows">
          <i className="fa fa-arrow-left slick-arrow slider-prev"></i>
          <i className="fa fa-arrow-right slick-arrow slider-next"></i>
        </div>
      </div>

      <div className="metro_home-slider-2" ref={sliderRef}>
        <article className="metro_post metro_recipe metro_recipe-3">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src={recipe4} alt="recipe"/>
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <span className="metro_post-meta"> <a href="#"> Breakfast </a> </span>
              <div className="metro_rating">
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star"></i>
              </div>
              <h5> <a href="recipe-details.html">Cheese Burger With a Touch of Curry and Cumin</a> </h5>
            </div>
            <a className="btn-link" href="recipe-details.html"> Read More <i className="fas fa-arrow-right"></i> </a>
          </div>
        </article>

        <article className="metro_post metro_recipe metro_recipe-3">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src={recipe5} alt="recipe"/>
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <span className="metro_post-meta"> <a href="#"> Lunch </a> </span>
              <div className="metro_rating">
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star"></i>
              </div>
              <h5> <a href="recipe-details.html">Spicy Pasta with Fresh Herbs</a> </h5>
            </div>
            <a className="btn-link" href="recipe-details.html"> Read More <i className="fas fa-arrow-right"></i> </a>
          </div>
        </article>

        <article className="metro_post metro_recipe metro_recipe-3">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src={recipe6} alt="recipe"/>
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <span className="metro_post-meta"> <a href="#"> Dinner </a> </span>
              <div className="metro_rating">
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
              </div>
              <h5> <a href="recipe-details.html">Grilled Salmon with Vegetables</a> </h5>
            </div>
            <a className="btn-link" href="recipe-details.html"> Read More <i className="fas fa-arrow-right"></i> </a>
          </div>
        </article>

        <article className="metro_post metro_recipe metro_recipe-3">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src={recipe7} alt="recipe"/>
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <span className="metro_post-meta"> <a href="#"> Dessert </a> </span>
              <div className="metro_rating">
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star"></i>
              </div>
              <h5> <a href="recipe-details.html">Chocolate Cake with Berries</a> </h5>
            </div>
            <a className="btn-link" href="recipe-details.html"> Read More <i className="fas fa-arrow-right"></i> </a>
          </div>
        </article>

        {/* Thêm recipes để test slider */}
        <article className="metro_post metro_recipe metro_recipe-3">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src={recipe4} alt="recipe"/>
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <span className="metro_post-meta"> <a href="#"> Snacks </a> </span>
              <div className="metro_rating">
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star active"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <h5> <a href="recipe-details.html">Healthy Smoothie Bowl</a> </h5>
            </div>
            <a className="btn-link" href="recipe-details.html"> Read More <i className="fas fa-arrow-right"></i> </a>
          </div>
        </article>
      </div>
    </div>
  );
};

export default FeaturedRecipe;