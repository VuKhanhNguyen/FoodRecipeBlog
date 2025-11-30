import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage.jsx'
import RecipeDetailPage from './pages/RecipeDetailPage.jsx'
import RecipeCategoriesPage from './pages/RecipeCategoriesPage.jsx'
import RecipeGridPage from './pages/RecipeGridPage.jsx';

function App() {

return (    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe-detail" element={<RecipeDetailPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/recipe-categories" element={<RecipeCategoriesPage />} />
        <Route path="/recipe-grid" element={<RecipeGridPage />} />
      </Routes>
    </Router>
  );

}

export default App
