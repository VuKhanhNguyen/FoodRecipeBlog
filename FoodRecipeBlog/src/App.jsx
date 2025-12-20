import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import GlobalLoadingOverlay from "./components/common/GlobalLoadingOverlay.jsx";
import RouteChangeLoader from "./components/common/RouteChangeLoader.jsx";
import RecipeDetailPage from "./pages/RecipeDetailPage.jsx";
import RecipeCategoriesPage from "./pages/RecipeCategoriesPage.jsx";
import RecipeGridPage from "./pages/RecipeGridPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SubmitBlogRecipePage from "./pages/SubmitBlogRecipePage.jsx";
import BlogRecipeManagePage from "./pages/BlogRecipeManagePage.jsx";
import AuthorsPage from "./pages/ListAuthorsPage.jsx";
import RegisterPage from "./pages/RegisterPage";
import AdminBlogManagePage from "./admin/adminPage.jsx";

function App() {
  return (
    <Router>
      <RouteChangeLoader />
      <GlobalLoadingOverlay />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe-detail" element={<RecipeDetailPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/recipe-categories" element={<RecipeCategoriesPage />} />
        <Route path="/recipe-grid" element={<RecipeGridPage />} />
        <Route path="/recipe-grid/:categoryName" element={<RecipeGridPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recipe-submit" element={<SubmitBlogRecipePage />} />
        <Route path="/blog-manage" element={<BlogRecipeManagePage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/blogs" element={<AdminBlogManagePage />} />
        <Route path="/admin" element={<AdminBlogManagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
