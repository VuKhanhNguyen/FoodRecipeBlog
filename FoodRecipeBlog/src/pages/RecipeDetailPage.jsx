import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroBanner from "../components/home/HeroBanner";
import RecipeCard from "../components/common/RecipeCard";
import VideoRecipes from "../components/home/VideoRecipes";
import SidebarCTA from "../components/sidebar/SidebarCTA";
import SidebarCTA2 from "../components/sidebar/SideBarCTA2.jsx";
import InstagramFeed from "../components/home/InstagramFeed";
import RecipeGrid from "../components/home/RecipeGrid";
import PopularRecipe from "../components/home/PopularRecipe";
import FeaturedRecipe from "../components/home/FeaturedRecipe";
import Pagination from "../components/common/Pagination";
import RecipeDetailBanner from "../components/otherBanner/RecipeDetailBanner.jsx";
import Content from "../components/details/Content.jsx";
import Comment from "../components/details/Comment.jsx";
import CommentForm from "../components/details/CommentForm.jsx";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);

        if (!response.ok) {
          throw new Error("Không thể tải thông tin công thức");
        }

        const data = await response.json();
        console.log("Recipe detail data:", data.recipe);
        setRecipe(data.recipe);

        // Fetch comments for this recipe
        try {
          const commentsResponse = await fetch(
            `http://localhost:5000/api/recipes/${id}/comments`
          );
          if (commentsResponse.ok) {
            const commentsData = await commentsResponse.json();
            setComments(commentsData.comments || []);
          }
        } catch (commentsErr) {
          console.error("Error fetching comments:", commentsErr);
          // Không throw error, chỉ log vì comments không quan trọng bằng recipe
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);
  useEffect(() => {
    // Đảm bảo jQuery và Slick đã được load
    if (
      typeof window.$ === "undefined" ||
      typeof window.$.fn.slick === "undefined"
    ) {
      console.error("jQuery hoặc Slick slider chưa được load");
      return;
    }

    const initSlider = () => {
      const slider = window.$(".metro_related-posts-slider");

      if (slider.length > 0) {
        // Kiểm tra nếu slider đã được khởi tạo
        if (slider.hasClass("slick-initialized")) {
          slider.slick("unslick"); // Hủy slider cũ trước khi tạo mới
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
                  },
                },
                {
                  breakpoint: 575,
                  settings: {
                    slidesToShow: 1,
                  },
                },
              ],
            });
          } catch (error) {
            console.error("Lỗi khởi tạo Related Posts slider:", error);
          }
        }, 100);
      }
    };

    initSlider();

    // Cleanup function
    return () => {
      const slider = window.$(".metro_related-posts-slider");
      if (slider.length > 0 && slider.hasClass("slick-initialized")) {
        try {
          slider.slick("unslick");
        } catch (error) {
          console.error("Lỗi khi cleanup Related Posts slider:", error);
        }
      }
    };
  }, []);

  if (loading) {
    return (
      <React.Fragment>
        <Header />
        <RecipeDetailBanner />
        <div className="section metro_post-single">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <p>Đang tải công thức...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }

  if (error || !recipe) {
    return (
      <React.Fragment>
        <Header />
        <RecipeDetailBanner />
        <div className="section metro_post-single">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <p className="text-danger">
                  Lỗi: {error || "Không tìm thấy công thức"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <RecipeDetailBanner />
      <div className="section metro_post-single">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* Content Component */}
              <Content recipe={recipe} commentsCount={comments.length} />

              <Comment />
            </div>
            <SidebarCTA2 />
          </div>
        </div>
      </div>

      <InstagramFeed />
      <Footer />
    </React.Fragment>
  );
};
export default RecipeDetailPage;
