import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage.jsx'
import RecipeDetailPage from './pages/RecipeDetailPage.jsx'

function App() {

return (    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe-detail" element={<RecipeDetailPage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
      </Routes>
    </Router>
  );

}

export default App
