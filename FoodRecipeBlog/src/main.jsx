import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/css/plugins/bootstrap.min.css';
import './assets/css/plugins/magnific-popup.css';
import './assets/css/plugins/slick.css';
import './assets/css/plugins/slick-theme.css';
import './assets/css/plugins/ion.rangeSlider.min.css';
import './assets/css/plugins/animate.min.css';
import './assets/fonts/flaticon/flaticon.css';
import './assets/fonts/font-awesome/css/font-awesome.min.css';
import './assets/css/style.css';
import Headers from './components/layout/Header.jsx';

import HomePage from './pages/HomePage.jsx';
createRoot(document.body).render(
  <StrictMode>
    <App />
  </StrictMode>
) 
