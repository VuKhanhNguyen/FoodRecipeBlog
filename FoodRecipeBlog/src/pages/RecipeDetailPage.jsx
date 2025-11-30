import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroBanner from '../components/home/HeroBanner';
import RecipeCard from '../components/common/RecipeCard';
import VideoRecipes from '../components/home/VideoRecipes';
import SidebarCTA from '../components/sidebar/SidebarCTA';
import SidebarCTA2 from '../components/sidebar/SideBarCTA2.jsx';
import InstagramFeed from '../components/home/InstagramFeed';
import RecipeGrid from '../components/home/RecipeGrid';
import PopularRecipe from '../components/home/PopularRecipe';
import FeaturedRecipe from '../components/home/FeaturedRecipe';
import Pagination from '../components/common/Pagination';
import RecipeDetailBanner from '../components/otherBanner/RecipeDetailBanner.jsx';
import Content from '../components/details/Content.jsx';
import Comment from '../components/details/Comment.jsx';
import CommentForm from '../components/details/CommentForm.jsx';

const RecipeDetailPage = ({ recipe }) => {
     useEffect(() => {
    // Đảm bảo jQuery và Slick đã được load
    if (typeof window.$ === 'undefined' || typeof window.$.fn.slick === 'undefined') {
      console.error('jQuery hoặc Slick slider chưa được load');
      return;
    }

    const initSlider = () => {
      const slider = window.$('.metro_related-posts-slider');
      
      if (slider.length > 0) {
        // Kiểm tra nếu slider đã được khởi tạo
        if (slider.hasClass('slick-initialized')) {
          slider.slick('unslick'); // Hủy slider cũ trước khi tạo mới
        }

        // Đợi một chút để DOM render hoàn toàn
        setTimeout(() => {
          try {
            slider.slick({
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
              dots: false,
              autoplay: true,
              accessibility: true,
              autoplaySpeed: 3000,
              responsive: [
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
            console.error('Lỗi khởi tạo Related Posts slider:', error);
          }
        }, 100);
      }
    };

    initSlider();

    // Cleanup function
    return () => {
      const slider = window.$('.metro_related-posts-slider');
      if (slider.length > 0 && slider.hasClass('slick-initialized')) {
        try {
          slider.slick('unslick');
        } catch (error) {
          console.error('Lỗi khi cleanup Related Posts slider:', error);
        }
      }
    };
  }, []);

  return (
    <React.Fragment>
        <Header/>
    <RecipeDetailBanner/>
    <div className="section metro_post-single">
        <div className="container">

            <div className="row">
                <div className="col-lg-8">
                    {/* Content Component */}
                    <Content />
                    
                    <div className="metro_related-posts">
                        <h4>Related Recipes</h4>
                        <div className="metro_related-posts-slider">
                            <RecipeCard />
                            <RecipeCard />
                            <RecipeCard />
                            <RecipeCard />
                        </div>
                    </div>
                        
                        <CommentForm />
                        <Comment />

                </div>
                <SidebarCTA2 />
            </div>
        </div>
    </div>

    <InstagramFeed/>
        <Footer/>
    </React.Fragment>
  );
};
export default RecipeDetailPage;