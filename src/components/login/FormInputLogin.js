import React from "react";
import "./FormInputLogin.css";

class FormInputLogin extends React.Component {
  state = {
    userInput: "",
    showError: false
  };

  handleInput = e => {
    const id = e.target.id;
    const value = e.target.value;

    this.setState(state => ({ userInput: value }));

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
        this.setState({ showError: true });
      }
    } else {
      if (!input.match(/^.{4,60}$/)) {
        this.setState({ showError: true });
      }
    }
  };

  render() {
    const { id, placeholder, inputType, errorMsg } = this.props;
    const { userInput, showError } = this.state;

    const labelStyle = { padding: ".3rem 0 0 .9rem", fontSize: ".9rem" };
    const inputStyle = { paddingTop: "1.6rem", paddingBottom: ".6rem" };
    const errorStyleBorder = { borderBottom: ".1rem solid #E87C03" };
    const userLength = userInput.length > 0;

    const styleLabel = userLength ? labelStyle : {};
    const styleInput = userLength ? inputStyle : {};

    return (
      <div className="login_input">
        <label style={styleLabel} htmlFor={id}>
          {placeholder}
        </label>
        <input
          onChange={this.handleInput}
          value={this.state.userInput}
          id={id}
          style={{ ...styleInput, ...showError ? errorStyleBorder : {} }}
          type={inputType}
        />
        <p className={`error ${showError ? "show_error" : ""}`}>
          {errorMsg}
        </p>
      </div>
    );
  }
}

export default FormInputLogin;
