import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import RecipeForm from "../components/recipeManage/RecipeForm";
import RecipePreview from "../components/recipeManage/RecipePreview";
import WidgetSearch from "../components/sidebar/WidgetSearch";
import WidgetRecentPost from "../components/sidebar/WidgetRecentPost";
import WidgetCategories from "../components/sidebar/WidgetCategories";
import WidgetTags from "../components/sidebar/WidgetTags";
import SidebarCTA from "../components/sidebar/SidebarCTA";
import SidebarCTA3 from "../components/sidebar/SidebarCTA3";
import "../assets/css/blog_submit.css";
import AddBlogRecipeBanner from "../components/otherBanner/SubmitBlogRecipeBanner";
import InstagramFeed from "../components/home/InstagramFeed";

const SubmitBlogRecipe = () => {
  const [formData, setFormData] = useState({
    recipeName: "",
    category: "",
    description: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    calories: "",
    difficulty: "",
    ingredients: [""],
    directions: [""],
    tags: "",
    recipeImage: null,
  });

  return (
    <>
      <Header />
      <AddBlogRecipeBanner />
      {/* Main Content */}
      <div className="section metro_post-single blog-recipe-manage-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <RecipeForm formData={formData} setFormData={setFormData} />
            </div>
            <SidebarCTA3 formData={formData} />
          </div>
        </div>
      </div>
      ;<InstagramFeed />
      <Footer />
    </>
  );
};

export default SubmitBlogRecipe;
