import React from "react";
import "./FormLogin.css";
import FormInputLogin from "./FormInputLogin";

class FormLogin extends React.Component {
  state = {
    rememberMe: false
  };

  handleRememberMe = () => {
    this.setState(state => ({ rememberMe: !state.rememberMe }));
  };

  handleSubmit = (e) => {
      e.preventDefault();
      console.log('submit')
  }

  render() {
    return (
      <form className="login_form">
        <div className="login_inputs">
          <FormInputLogin
            id="userId"
            placeholder="Email or phone number"
            inputType="text"
            errorMsg="Please enter a valid email or phone number."
          />
          <FormInputLogin
            id="userPassword"
            placeholder="Password"
            inputType="password"
            errorMsg="Your password must contain between 4 and 60 characters."
          />
        </div>

        <div className="login_submit">
          <button onClick={this.handleSubmit} type="submit">Sign In</button>
          <div className="login_check_help">
            <div>
              <label
                onClick={this.handleRememberMe}
                className="login_checkbox_container"
              >
                <input className="checkbox" type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <p>Remeber me</p>
            </div>

            <p>Need Help?</p>
          </div>
        </div>
      </form>
    );
  }
}

export default FormLogin;
