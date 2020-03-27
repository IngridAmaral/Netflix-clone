import React from "react";
import "./LoginEnterCard.css";
import FormLogin from "./FormLogin";
import { Link } from 'react-router-dom'

class LoginEnterCard extends React.Component {
  state = {
    showInfo: false,
  };

  handleClickShow = e => {
    e.preventDefault();
    this.setState(state => ({ showInfo: !state.showInfo }));
  };

  render() {
    const title  = this.props.signup === true ? 'Sign Up' : 'Sign In';
    return (
      <div className="login_enter_session">
        <h1>{title}</h1>

        <FormLogin isSignUpPage={this.props.signup} title={title} />

        <div className="login_facebook">
          <img
            alt="facebook icon"
            src="https://www.facebook.com/images/fb_icon_325x325.png"
          />
          <p>Login with Facebook</p>
        </div>

        {this.props.signup === true ? (
          ""
        ) : (
          <div className="login_signup">
            New to Netflix?
            <Link to='/signup' style={{textDecoration: 'none'}}><p> Sign up now </p></Link>.
          </div>
        )}

        <div className="login_infos_google">
          <div>
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <a
                href="#"
                onClick={this.handleClickShow}
                className={!this.state.showInfo ? "showLearn" : "hide"}
              >
                Learn more.
              </a>
            </p>
          </div>

          <p className={this.state.showInfo ? "show" : "hide"}>
            The information collected by Google reCAPTCHA is subject to the
            Google Privacy Policy and Terms of Service, and is used for
            providing, maintaining, and improving the reCAPTCHA service and for
            general security purposes (it is not used for personalized
            advertising by Google).
          </p>
        </div>
      </div>
    );
  }
}

export default LoginEnterCard;
