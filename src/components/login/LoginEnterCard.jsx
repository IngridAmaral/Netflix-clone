import React from 'react';
import PropTypes from 'prop-types';
import './LoginEnterCard.css';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

class LoginEnterCard extends React.Component {
  state = {
    showInfo: false,
  };

  handleClickShow = (e) => {
    e.preventDefault();
    this.setState((state) => ({ showInfo: !state.showInfo }));
  };

  renderSignIn = () => (
    <div className="login_signup">
      New to Netflix?
      <Link to="/signup" style={{ textDecoration: 'none' }}>
        <p> Sign up now </p>
      </Link>
      .
    </div>
  )

  render() {
    const { signup } = this.props;
    const { showInfo } = this.state;

    const title = signup === true ? 'Sign Up' : 'Sign In';
    return (
      <div className="login_enter_session">
        <h1>{title}</h1>

        <LoginForm signup={signup} title={title} />

        <div className="login_facebook">
          <img
            alt="facebook icon"
            src="https://www.facebook.com/images/fb_icon_325x325.png"
          />
          <p>Login with Facebook</p>
        </div>

        {signup !== true && this.renderSignIn()}

        <div className="login_infos_google">
          <div>
            <p>
              {
                "This page is protected by Google reCAPTCHA to ensure you're not a bot. "
              }
              <button
                type="button"
                onClick={this.handleClickShow}
                className={!showInfo ? 'showLearn' : 'hide'}
              >
                Learn more.
              </button>
            </p>
          </div>

          <p className={showInfo ? 'show' : 'hide'}>
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

LoginEnterCard.propTypes = {
  signup: PropTypes.bool.isRequired,
};

export default LoginEnterCard;
