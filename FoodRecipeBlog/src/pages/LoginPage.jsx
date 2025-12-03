import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import LoginForm from '../components/login/LoginForm';
import SocialLogin from '../components/login/SocialLogin';
import '../assets/css/login.css';

const LoginPage = () => {
  return (
    <>
      <Header />
      
      <div className="login-page">
        <div className="login-container">
          <LoginForm />
          <SocialLogin />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;
