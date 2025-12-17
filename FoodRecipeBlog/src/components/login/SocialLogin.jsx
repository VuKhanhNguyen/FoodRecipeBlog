import React from 'react';

const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Xử lý đăng nhập mạng xã hội ở đây
  };

  return (
    <div className="social-login-wrapper">
      <div className="divider">
        <span>Hoặc đăng nhập với</span>
      </div>

      <div className="social-login-buttons">
        <button 
          className="social-btn google-btn"
          onClick={() => handleSocialLogin('Google')}
        >
          <i className="fab fa-google"></i>
          <span>Google</span>
        </button>

        <button 
          className="social-btn facebook-btn"
          onClick={() => handleSocialLogin('Facebook')}
        >
          <i className="fab fa-facebook-f"></i>
          <span>Facebook</span>
        </button>

        <button 
          className="social-btn twitter-btn"
          onClick={() => handleSocialLogin('Twitter')}
        >
          <i className="fab fa-twitter"></i>
          <span>Twitter</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
