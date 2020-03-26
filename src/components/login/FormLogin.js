import React from "react";
import "./FormLogin.css";

class FormLogin extends React.Component {
  state = {
    userIdInput: "",
    userPasswordInput: "",
    rememberMe: false
  };

  handleInput = e => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "userId") {
      this.setState(state => ({ userIdInput: value }));
    } else {
      this.setState(state => ({ userPasswordInput: value }));
    }
  };

  handleRememberMe = () => {
    this.setState(state => ({rememberMe: !state.rememberMe}))
  }

  render() {
    let styleLabelId =
      this.state.userIdInput.length > 0
        ? { padding: ".3rem 0 0 .9rem", fontSize: ".9rem" }
        : {};
    let styleLabelPass =
      this.state.userPasswordInput.length > 0
        ? { padding: ".3rem 0 0 .9rem", fontSize: ".9rem" }
        : {};

    let styleInputId =
      this.state.userIdInput.length > 0
        ? { paddingTop: "1.6rem", paddingBottom: ".6rem" }
        : {};
    let styleInputPass =
      this.state.userPasswordInput.length > 0
        ? { paddingTop: "1.6rem", paddingBottom: ".6rem" }
        : {};

    return (
      <form className="login_form">
        <div className="login_inputs">
          <div className="inputId">
            <label
              style={styleLabelId}
              htmlFor="userId"
              className="placeholder"
            >
              Email or phone number
            </label>
            <input
              onChange={this.handleInput}
              value={this.state.userIdInput}
              id="userId"
              style={styleInputId}
              type="email"
            />
          </div>
          <div className="inputPassword">
            <label
              style={styleLabelPass}
              htmlFor="userPassword"
              className="placeholder"
            >
              Password
            </label>
            <input
              onChange={this.handleInput}
              id="userPassword"
              value={this.state.userPasswordInput}
              type="password"
              style={styleInputPass}
            />
          </div>
        </div>

        <div className="login_submit">
          <button type="submit">Sign In</button>
          <div className="login_check_help">
            <div>
              <label onClicl={this.handleRememberMe} className="login_checkbox_container">
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
