import React from "react";
import "./Login.css";
import LoginEnterCard from './LoginEnterCard';
import FooterLogin from './FooterLogin';

class Login extends React.Component {
    render() {
    return (
      <div className="login_container">
        <div className="login_container_layer">
          <div className="login_header_logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
              alt="Netflix Logo"
            />
          </div>
          <LoginEnterCard />
          <FooterLogin />
        </div>
      </div>
    );
  }
}

export default Login;
