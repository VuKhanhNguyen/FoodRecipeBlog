import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import RecipeCategoriesBanner from "../components/otherBanner/RecipeCategoriesBanner";
import RecipeList from "../components/common/RecipeList";
import { useParams } from "react-router-dom";
import InstagramFeed from "../components/home/InstagramFeed";
import Pagination from "../components/common/Pagination";
import RecipeBlogBanner from "../components/otherBanner/RecipeBlogBanner";

const RecipeGridPage = () => {
  const { categoryName } = useParams();

  return (
    <React.Fragment>
      <Header />
      <RecipeBlogBanner />
      <div className="section">
        <div className="container">
          {categoryName && (
            <div className="row mb-4">
              <div className="col-12">
                <h3>Danh mục: {decodeURIComponent(categoryName)}</h3>
              </div>
            </div>
          )}
          <div className="row">
            <RecipeList categoryName={categoryName} />
          </div>
        </div>
        <Pagination />
      </div>

      <InstagramFeed />
      <Footer />
    </React.Fragment>
  );
};
export default RecipeGridPage;
