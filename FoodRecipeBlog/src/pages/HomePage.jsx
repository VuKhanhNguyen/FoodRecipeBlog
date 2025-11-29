import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroBanner from '../components/home/HeroBanner';
import RecipeCard from '../components/common/RecipeCard';
import VideoRecipes from '../components/home/VideoRecipes';
import SidebarCTA from '../components/sidebar/SidebarCTA';
import InstagramFeed from '../components/home/InstagramFeed';
import RecipeGrid from '../components/home/RecipeGrid';
import PopularRecipe from '../components/home/PopularRecipe';
import FeaturedRecipe from '../components/home/FeaturedRecipe';
import Pagination from '../components/common/Pagination';

const HomePage = () => {
  return (
    <React.Fragment>
      <Header />
      <HeroBanner />
      <RecipeGrid />

      <div className="section pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* Popular Recipes can be added here */}
              <PopularRecipe />
              {/* Featured Recipes can be added here */}
              <FeaturedRecipe />
              {/* Regular Recipes - Assuming RecipeCard is used for this */}
              <div className="section section-padding pt-0">
                <div className="section-title flex-title">
                  <h4 className="title">Regular Recipes</h4>
                  <a href="recipe-grid.html" className="btn-link"> View All Recipes <i className="fas fa-arrow-right"></i>  </a>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <RecipeCard />
                  </div>
                  <div className="col-md-6">
                    <RecipeCard />
                  </div>
                  <div className="col-md-6">
                    <RecipeCard />
                  </div>
                  <div className="col-md-6">
                    <RecipeCard />
                  </div>
                </div>
              </div>

              <VideoRecipes />

              {/* Trending Recipes can be added here */}
                <div className="section section-padding p-0">
                    <div className="section-title flex-title">
                    <h4 className="title">Trending Recipes</h4>
                    <a href="recipe-grid.html" className="btn-link"> View All Recipes <i className="fas fa-arrow-right"></i>  </a>
                    </div>
                    <div className="row">       
                        <div className="col-md-6">
                            <RecipeCard />
                        </div>
                        <div className="col-md-6">
                            <RecipeCard />
                        </div>
                    </div>
                    <Pagination />
                </div>

        </div>
            <SidebarCTA />
          </div>
        </div>
      </div>

      <InstagramFeed />
      <Footer />
    </React.Fragment>
  );
};
export default HomePage;