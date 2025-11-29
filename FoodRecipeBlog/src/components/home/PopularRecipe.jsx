import React, { useEffect, useRef } from 'react';
import recipe1 from '../../assets/img/recipes/1.jpg';
import recipe2 from '../../assets/img/recipes/2.jpg';
import recipe3 from '../../assets/img/recipes/3.jpg';
import recipe4 from '../../assets/img/recipes/4.jpg';

const PopularRecipe = () => {
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
              accessibility: false, // Đổi thành true để tránh lỗi ADA
              prevArrow: '.slider-prev',
              nextArrow: '.slider-next',
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
    <div className="section p-0 metro_home-slider-wrapper">
      <div className="section-title flex-title">
        <h4 className="title">Popular Recipes</h4>    
        <div className="metro_arrows">
          <i className="fa fa-arrow-left slick-arrow slider-prev"></i>
          <i className="fa fa-arrow-right slick-arrow slider-next"></i>
        </div>
      </div>

      <div className="metro_home-slider" ref={sliderRef}>
        {/* Recipe items */}
        <article className="metro_post metro_recipe metro_recipe-2">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src={recipe1} alt="recipe"/>
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <span className="metro_post-meta"> 
                <a href="#"> <i className="far fa-clock"></i> 45 Minutes </a> 
                <a href="recipe-details.html"> <i className="far fa-knife-kitchen"></i> Expert</a> 
              </span>
              <h5> <a href="recipe-details.html">Cheese Burger With a Touch of Curry and Cumin</a> </h5>
            </div>
          </div>
        </article>

        <article className="metro_post metro_recipe metro_recipe-2">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src={recipe2} alt="recipe"/>
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <span className="metro_post-meta"> 
                <a href="#"> <i className="far fa-clock"></i> 45 Minutes </a> 
                <a href="recipe-details.html"> <i className="far fa-knife-kitchen"></i> Expert</a> 
              </span>
              <h5> <a href="recipe-details.html">Cheese Burger With a Touch of Curry and Cumin</a> </h5>
            </div>
          </div>
        </article>

        <article className="metro_post metro_recipe metro_recipe-2">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src={recipe3} alt="recipe"/>
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <span className="metro_post-meta"> 
                <a href="#"> <i className="far fa-clock"></i> 45 Minutes </a> 
                <a href="recipe-details.html"> <i className="far fa-knife-kitchen"></i> Expert</a> 
              </span>
              <h5> <a href="recipe-details.html">Cheese Burger With a Touch of Curry and Cumin</a> </h5>
            </div>
          </div>
        </article>

        <article className="metro_post metro_recipe metro_recipe-2">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src={recipe4} alt="recipe"/>
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <span className="metro_post-meta"> 
                <a href="#"> <i className="far fa-clock"></i> 45 Minutes </a> 
                <a href="recipe-details.html"> <i className="far fa-knife-kitchen"></i> Expert</a> 
              </span>
              <h5> <a href="recipe-details.html">Cheese Burger With a Touch of Curry and Cumin</a> </h5>
            </div>
          </div>
        </article>

        {/* Thêm thêm recipes để test slider */}
        <article className="metro_post metro_recipe metro_recipe-2">
          <div className="metro_post-thumb">
            <a href="recipe-details.html">
              <img src={recipe1} alt="recipe"/>
            </a>
          </div>
          <div className="metro_post-body">
            <div className="metro_post-desc">
              <span className="metro_post-meta"> 
                <a href="#"> <i className="far fa-clock"></i> 30 Minutes </a> 
                <a href="recipe-details.html"> <i className="far fa-knife-kitchen"></i> Beginner</a> 
              </span>
              <h5> <a href="recipe-details.html">Another Delicious Recipe</a> </h5>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PopularRecipe;