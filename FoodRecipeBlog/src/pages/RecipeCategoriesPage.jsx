import React, { useEffect } from "react";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RecipeCategoriesBanner from "../components/otherBanner/RecipeCategoriesBanner";
import Categories from '../components/categories/RecipeCategories.jsx';
import { useNavigate } from 'react-router-dom';
import InstagramFeed from '../components/home/InstagramFeed';
import Pagination from "../components/common/Pagination";

const RecipeCategoriesPage = () => {

    return(
        <React.Fragment>
            <Header />
            <RecipeCategoriesBanner />
            <div class="section">
                <div class="container">
                    <div class="row">
                        <Categories />
                        <Categories />
                        <Categories />
                        <Categories />
                        <Categories />
                        <Categories />
                        <Categories />
                        <Categories />
                        <Categories />
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