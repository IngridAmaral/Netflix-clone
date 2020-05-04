import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from './redux/actions/login';

import './LoginForm.css';
import LoginFormInput from './LoginFormInput';

const LOGIN_ID = 'loginId';
const LOGIN_PASSWORD = 'loginPassword';
const USER_NAME = 'userName';
const USER_EMAIL = 'userEmail';
const USER_PHONE = 'userPhone';
const USER_PASSWORD = 'userPassword';
const USER_PASSWORD_REPEAT = 'userPasswordRepeat';
const signinInfos = [
  {
    id: LOGIN_ID,
    placeholder: 'Email or phone number',
    inputType: 'text',
    errorMsg: 'Please enter a valid email or phone number.',
  },
  {
    id: LOGIN_PASSWORD,
    placeholder: 'Password',
    inputType: 'password',
    errorMsg: 'Your password must contain between 4 and 60 characters.',
  },
];
const signupInfos = [
  {
    id: USER_NAME,
    placeholder: 'Name',
    inputType: 'text',
    errorMsg: 'Please enter your name.',
  },
  {
    id: USER_EMAIL,
    placeholder: 'Email',
    inputType: 'email',
    errorMsg: 'Please enter a valid email.',
  },
  {
    id: USER_PHONE,
    placeholder: 'Phone',
    inputType: 'text',
    errorMsg: 'Please enter a valid phone number.',
  },
  {
    id: USER_PASSWORD,
    placeholder: 'Password',
    inputType: 'password',
    errorMsg: 'Your password must contain between 4 and 60 characters.',
  },
  {
    id: USER_PASSWORD_REPEAT,
    placeholder: 'Repeat Password',
    inputType: 'password',
    errorMsg: 'Please enter the same password as above.',
  },
];
const regexEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
const regexCel = /^[2-9]\d{2}\d{3}\d{4}$/;
const regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const regexPassword = /^.{4,60}$/;

class LoginForm extends React.Component {
  state = {
    rememberMe: false,
    form: {},
  };

  handleSubmitSignUp = (e, history) => {
    const { dispatch } = this.props;
    const { form } = this.state;
    e.preventDefault();

    const newUserKeys = Object.keys(form);

    if (newUserKeys.length === signupInfos.length) {
      let newUser = {};
      newUserKeys.forEach((id) => {
        const userId = form.userEmail.value;
        const encodedPassword = (id === USER_PASSWORD_REPEAT || id === USER_PASSWORD)
          ? window.btoa(form[id].value)
          : false;
        newUser = {
          [userId]: {
            ...newUser[userId],
            [id]: !encodedPassword ? form[id].value : encodedPassword,
          },
        };
      });

      dispatch(addUser(newUser));

      this.setState({
        rememberMe: false,
        form: {},
      });

      history.push('/login');
    } else {
      this.handleEmptyInput();
    }
  }

  handleSubmitSignIn = (e, history) => {
    const { users } = this.props;
    const { form } = this.state;
    e.preventDefault();

    const formKeys = Object.keys(form);

    if (formKeys.length === signinInfos.length) {
      if (users[form.loginId.value]) {
        const usersPassword = window.atob(users[form.loginId.value].userPassword);
        const signInPassword = form.loginPassword.value;

        if (signInPassword === usersPassword) {
          window.localStorage.setItem(
            'activeUser',
            JSON.stringify(users[form.loginId.value]),
          );
          history.push('/browse');
        }
        this.handleIncorrectTypeInput(LOGIN_PASSWORD);
      } else {
        this.handleIncorrectTypeInput(LOGIN_ID);
        this.handleIncorrectTypeInput(LOGIN_PASSWORD);
      }
    } else {
      this.handleEmptyInput();
    }
  }

  handleIncorrectTypeInput = (id) => {
    this.setState((state) => ({
      form: {
        ...state.form,
        [id]: { value: '', showError: true },
      },
    }));
  };

  handleEmptyInput = () => {
    const { form } = this.state;

    const infos = !this.isSignUpPage() ? signinInfos : signupInfos;
    infos.forEach((obj) => {
      if (!form[obj.id]) {
        this.setState((state) => ({
          form: {
            ...state.form,
            [obj.id]: { value: '', showError: true },
          },
        }));
      }
    });
  };

  handleOnChange = (e) => {
    const { id } = e.target;
    const input = e.target.value;

    const error = this.inputRegexValidation(input, id);

    this.setState((state) => ({
      form: {
        ...state.form,
        [id]: { value: input, showError: error },
      },
    }));
  };

  inputRegexValidation = (input, id) => {
    let regex = null;

    switch (id) {
      case LOGIN_ID:
        regex = { email: regexEmail, cel: regexCel };
        break;
      case USER_EMAIL:
        regex = regexEmail;
        break;
      case USER_PHONE:
        regex = regexCel;
        break;
      case USER_NAME:
        regex = regexName;
        break;
      case LOGIN_PASSWORD:
      case USER_PASSWORD:
      case USER_PASSWORD_REPEAT:
        regex = regexPassword;
        break;
      default:
        regex = null;
    }

    const { form } = this.state;
    let error = false;

    const userIdError = id === LOGIN_ID && !regex.email.test(input) && !regex.cel.test(input);
    const userPasswordNotEqual = id === USER_PASSWORD_REPEAT && form.userPassword.value !== input;
    const inputError = id !== LOGIN_ID && !regex.test(input);

    if (userIdError || userPasswordNotEqual || inputError) {
      error = true;
    } else {
      error = false;
    }

    return error;
  };

  renderSubmitBtn = () => {
    const { title } = this.props;
    return (
      <Route
        render={({ history }) => (
          <button
            onClick={
              (e) => (!this.isSignUpPage()
                ? this.handleSubmitSignIn(e, history)
                : this.handleSubmitSignUp(e, history)
              )
            }
            type="submit"
          >
            {title}
          </button>
        )}
      />
    );
  }

  handleRememberMe = () => {
    this.setState((state) => ({
      rememberMe: !state.rememberMe,
    }));
  }

  renderSignInBottom = () => (
    <div>
      <label
        className="login_checkbox_container"
        htmlFor="rememberMe"
      >
        <input
          onClick={this.handleRememberMe}
          id="rememberMe"
          className="checkbox"
          type="checkbox"
        />
        <span className="checkmark" />
      </label>
      <p>Remeber me</p>
    </div>
  )

  renderInputs = () => {
    const { form } = this.state;

    const inputsInfos = this.isSignUpPage() ? signupInfos : signinInfos;

    return inputsInfos.map(({
      id, placeholder, inputType, errorMsg,
    }) => {
      let value = '';
      let showError = false;
      if (form[id]) {
        showError = form[id].showError;
        value = form[id].value;
      }

      return (
        <LoginFormInput
          key={id}
          id={id}
          placeholder={placeholder}
          inputType={inputType}
          showError={showError}
          errorMsg={errorMsg}
          onChange={this.handleOnChange}
          value={value}
        />
      );
    });
  }

  isSignUpPage = () => { // login or sign up
    const { signup } = this.props;
    return !!signup;
  }

  render() {
    return (
      <form className="login_form">
        <div className="login_inputs">
          {this.renderInputs()}
        </div>

        <div className="login_submit">
          {this.renderSubmitBtn()}
          <div className="login_check_help">
            {!this.isSignUpPage() && this.renderSignInBottom()}
            <p>Need Help?</p>
          </div>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  signup: PropTypes.bool,
  title: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  signup: false,
};

const mapStateToProps = (state) => ({
  users: state.manageStorage,
});

export default connect(mapStateToProps)(LoginForm);
