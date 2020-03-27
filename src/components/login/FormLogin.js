import React from "react";
import "./FormLogin.css";
import FormInputLogin from "./FormInputLogin";

class FormLogin extends React.Component {
  state = {
    rememberMe: false
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("submit");
  };

  render() {
    const { isSignUpPage, title } = this.props;

    const signin = [
      {
        id: "userId",
        placeholder: "Email or phone number",
        inputType: "text",
        errorMsg: "Please enter a valid email or phone number."
      },
      {
        id: "userPassword",
        placeholder: "Password",
        inputType: "password",
        errorMsg: "Your password must contain between 4 and 60 characters."
      }
    ];

    const signup = [
      {
        id: "userName",
        placeholder: "Name",
        inputType: "text",
        errorMsg: "Please enter your name."
      },
      {
        id: "userEmail",
        placeholder: "Email",
        inputType: "email",
        errorMsg: "Please enter a valid email."
      },
      {
        id: "userPhone",
        placeholder: "Phone",
        inputType: "text",
        errorMsg: "Please enter a valid phone number."
      },
      {
        id: "userPassword",
        placeholder: "Password",
        inputType: "password",
        errorMsg: "Your password must contain between 4 and 60 characters."
      },
      {
        id: "userPasswordRepeat",
        placeholder: "Repeat Password",
        inputType: "password",
        errorMsg: "Please enter the same password as above."
      }
    ];

    let renderInputsArr = isSignUpPage ? signup : signin;
    return (
      <form className="login_form">
        <div className="login_inputs">
          {renderInputsArr.map(input => {
            const { id, placeholder, inputType, errorMsg } = input;
            return (
              <FormInputLogin
                id={id}
                placeholder={placeholder}
                inputType={inputType}
                errorMsg={errorMsg}
              />
            );
          })}
        </div>

        <div className="login_submit">
          <button onClick={this.handleSubmit} type="submit">
            {title}
          </button>
          <div className="login_check_help">
            {isSignUpPage ? (
              ""
            ) : (
              <div>
                <label
                  onClick={() =>
                    this.setState(state => ({ rememberMe: !state.rememberMe }))
                  }
                  className="login_checkbox_container"
                >
                  <input className="checkbox" type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <p>Remeber me</p>
              </div>
            )}

            <p>Need Help?</p>
          </div>
        </div>
      </form>
    );
  }
}

export default FormLogin;
