import React from "react";
import "./FormLogin.css";

class FormLogin extends React.Component {
  state = {
    userIdInput: "",
    userPasswordInput: "",
    showErrorId: false,
    showErrorPassword: false,
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

    this.handleError(value, id);
  };

  handleRememberMe = () => {
    this.setState(state => ({ rememberMe: !state.rememberMe }));
  };

  handleError = (input, id) => {
    if (id === "userId") {
      if (
        !input.match(
          /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        ) ||
        !input.match(/^[2-9]\d{2}\d{3}\d{4}$/)
      ) {
        this.setState({ showErrorId: true });
      }
    } else {
      if (!this.state.userPasswordInput.match(/^.{4,60}$/)) {
        this.setState({ showErrorPassword: true });
      }
    }
  };

  render() {
    const {
      userIdInput,
      userPasswordInput,
      showErrorId,
      showErrorPassword
    } = this.state;

    const labelStyle = { padding: ".3rem 0 0 .9rem", fontSize: ".9rem" };
    const inputStyle = { paddingTop: "1.6rem", paddingBottom: ".6rem" };
    const errorStyleBorder = { borderBottom: ".1rem solid #E87C03" };
    const userIdLength = userIdInput.length > 0;
    const userPLength = userPasswordInput.length > 0;

    let styleLabelId = userIdLength ? labelStyle : {};
    let styleInputId = userIdLength ? inputStyle : {};
    let showEId = showErrorId ? errorStyleBorder : {};

    let styleLabelPass = userPLength ? labelStyle : {};
    let styleInputPass = userPLength ? inputStyle : {};
    let showEPass = showErrorPassword ? errorStyleBorder : {};

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
              style={{ ...styleInputId, ...showEId }}
              type="email"
            />
            <p className={`error ${showErrorId ? "show_error" : ""}`}>
              Please enter a valid email or phone number.
            </p>
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
              style={{ ...styleInputPass, ...showEPass }}
            />
            <p className={`error ${showErrorPassword ? "show_error" : ""}`}>
              Your password must contain between 4 and 60 characters.
            </p>
          </div>
        </div>

        <div className="login_submit">
          <button type="submit">Sign In</button>
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
