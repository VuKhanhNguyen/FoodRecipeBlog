import React, { useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 6;

  useEffect(() => {
    // Reset to first page when category changes
    setCurrentPage(1);
  }, [categoryName]);

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
            <RecipeList
              categoryName={categoryName}
              page={currentPage}
              pageSize={pageSize}
              onTotalChange={setTotalItems}
            />
          </div>
        </div>
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <InstagramFeed />
      <Footer />
    </React.Fragment>
  );
};
export default RecipeGridPage;
