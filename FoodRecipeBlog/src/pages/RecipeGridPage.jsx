import React, { useEffect } from "react";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RecipeCategoriesBanner from "../components/otherBanner/RecipeCategoriesBanner";
import RecipeCard from "../components/common/RecipeCard";
import { useNavigate } from 'react-router-dom';
import InstagramFeed from '../components/home/InstagramFeed';
import Pagination from "../components/common/Pagination";
import RecipeBlogBanner from "../components/otherBanner/RecipeBlogBanner";

const RecipeCategoriesPage = () => {

    return(
        <React.Fragment>
            <Header />
            <RecipeBlogBanner />
            <div className="section">
                <div className="container">
                    <div className="row">
                         <div className="col-lg-4 col-md-6">
                            <RecipeCard /> 
                        </div>
                         <div className="col-lg-4 col-md-6">
                            <RecipeCard /> 
                        </div>
                         <div className="col-lg-4 col-md-6">
                            <RecipeCard /> 
                        </div>
                         <div className="col-lg-4 col-md-6">
                            <RecipeCard /> 
                        </div>
                         <div className="col-lg-4 col-md-6">
                            <RecipeCard /> 
                        </div>
                         <div className="col-lg-4 col-md-6">
                            <RecipeCard /> 
                        </div>
                    </div>
                </div>
                <Pagination />
            </div>
            
            <InstagramFeed />
            <Footer />
            </React.Fragment>
    );
};
export default RecipeCategoriesPage;