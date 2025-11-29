import React, { useEffect } from 'react';
import banner2 from '../../assets/img/banners/2.jpg';
import banner3 from '../../assets/img/banners/3.jpg';
import banner4 from '../../assets/img/banners/4.jpg';

const HeroBanner = () => {
  useEffect(() => {
    // Khởi tạo Slick slider sau khi component đã render
    const slider = window.$('.metro_banner .metro_banner-slider');
    if (slider.length > 0 && slider.children().length > 0) {
      slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: false,
        accessibility: false,
        // prevArrow:
        //   '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        // nextArrow:
        //   '<button class="slick-next" aria-label="Next" type="button">Next</button>',
    
        responsive: [
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              autoplay: true,
            }
          },
          {
            breakpoint: 575,
            settings: {
              arrows: false,
              autoplay: true,
            }
          }
        ]
      });
    }
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần sau khi component mount
  return (
    <div className="metro_banner banner-2 dark-overlay dark-overlay-2" style={{backgroundImage: `url(${banner2})`}}>
      <div className="metro_banner-slider">

        <div className="metro_banner-item">

            <div className="container">
            <div className="metro_banner-text">
                <h1>Welcome to Recipe Community</h1>
            </div>
            </div>

        </div>
     
        <div className="metro_banner-item">

            <div className="container">
            <div className="metro_banner-text">
                <h1>Delicious Recipes Awaiting</h1>
            </div>
            </div>

        </div>
    
      </div>

      <div className="container">
      <div className="metro_banner-footer">
        <div className="metro_recipe-list-sm">
          <img src={banner3} alt="Recipe"/>
          <div className="metro_recipe-list-sm-content">
            <a href="#"> Burgers </a>
            <h6> <a href="blog-details.html">Tomato Stuffing with Cumin and Radish</a> </h6>
          </div>
        </div>
        <div className="metro_recipe-list-sm">
          <div className="metro_recipe-list-sm-content">
            <a href="#"> Pizzas </a>
            <h6> <a href="blog-details.html">Tomato Stuffing with Cumin and Radish</a> </h6>
          </div>
          <img src={banner4} alt="Recipe"/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HeroBanner;