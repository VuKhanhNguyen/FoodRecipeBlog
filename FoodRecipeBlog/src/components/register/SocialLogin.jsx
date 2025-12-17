import React from "react";

const SocialLogin = () => {
  const handleSocialRegister = (provider) => {
    console.log(`Register with ${provider}`);
    // Xử lý đăng ký bằng mạng xã hội ở đây
  };

  return (
    <div className="social-login-wrapper">
      <div className="divider">
        <span>Hoặc đăng ký với</span>
      </div>

      <div className="social-login-buttons">
        <button
          className="social-btn google-btn"
          onClick={() => handleSocialRegister("Google")}
        >
          <i className="fab fa-google"></i>
          <span>Google</span>
        </button>

        <button
          className="social-btn facebook-btn"
          onClick={() => handleSocialRegister("Facebook")}
        >
          <i className="fab fa-facebook-f"></i>
          <span>Facebook</span>
        </button>

        <button
          className="social-btn twitter-btn"
          onClick={() => handleSocialRegister("Twitter")}
        >
          <i className="fab fa-twitter"></i>
          <span>Twitter</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
