import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import RegisterForm from "../components/register/registerForm";
import SocialLogin from "../components/register/SocialLogin";
import "../assets/css/login.css";
import "../assets/css/register.css";
const RegisterPage = () => {
  return (
    <>
      <Header />

      <div className="login-page">
        <div className="login-container">
          <RegisterForm />
          <SocialLogin />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RegisterPage;
