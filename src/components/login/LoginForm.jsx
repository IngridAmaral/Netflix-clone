import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from './redux/actions/login';

import './LoginForm.css';
import LoginFormInput from './LoginFormInput';

const signinInfos = [
  {
    id: 'userId',
    placeholder: 'Email or phone number',
    inputType: 'text',
    errorMsg: 'Please enter a valid email or phone number.',
  },
  {
    id: 'formPassword',
    placeholder: 'Password',
    inputType: 'password',
    errorMsg: 'Your password must contain between 4 and 60 characters.',
  },
];
const signupInfos = [
  {
    id: 'userName',
    placeholder: 'Name',
    inputType: 'text',
    errorMsg: 'Please enter your name.',
  },
  {
    id: 'userEmail',
    placeholder: 'Email',
    inputType: 'email',
    errorMsg: 'Please enter a valid email.',
  },
  {
    id: 'userPhone',
    placeholder: 'Phone',
    inputType: 'text',
    errorMsg: 'Please enter a valid phone number.',
  },
  {
    id: 'userPassword',
    placeholder: 'Password',
    inputType: 'password',
    errorMsg: 'Your password must contain between 4 and 60 characters.',
  },
  {
    id: 'userPasswordRepeat',
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
        newUser = {
          [userId]: {
            ...newUser[userId],
            [id]: form[id].value,
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
      this.handleEmptyInput('signUp');
    }
  }

  handleSubmitSignIn = (e, history) => {
    const { users } = this.props;
    const { form } = this.state;
    e.preventDefault();

    const formKeys = Object.keys(form);

    if (formKeys.length === signinInfos.length) {
      if (users[form.userId.value]) {
        const usersPassword = users[form.userId.value].userPassword;
        const signInPassword = form.formPassword.value;

        if (signInPassword === usersPassword) {
          window.localStorage.setItem(
            'activeUser',
            JSON.stringify(users[form.userId.userId]),
          );
          history.push('/browse');
        }
        this.handleIncorrectTypeInput('formPassword');
      } else {
        this.handleIncorrectTypeInput('userId');
        this.handleIncorrectTypeInput('formPassword');
      }
    } else {
      this.handleEmptyInput('signIn');
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

  handleEmptyInput = (page) => {
    const { form } = this.state;

    const infos = page === 'signIn' ? signinInfos : signupInfos;
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

    this.inputRegexValidation(input, id);
  };

  inputRegexValidation = (input, id) => {
    let regex = null;

    switch (id) {
      case 'userId':
        regex = { email: regexEmail, cel: regexCel };
        break;
      case 'userEmail':
        regex = regexEmail;
        break;
      case 'userPhone':
        regex = regexCel;
        break;
      case 'userName':
        regex = regexName;
        break;
      case 'formPassword':
      case 'userPassword':
      case 'userPasswordRepeat':
        regex = regexPassword;
        break;
      default:
        regex = null;
    }

    this.inputRegexError(regex, id, input);
  };

  inputRegexError = (regex, id, input) => {
    const { form } = this.state;
    let error = false;

    const userIdError = id === 'userId' && !regex.email.test(input) && !regex.cel.test(input);
    const userPasswordNotEqual = id === 'userPasswordRepeat' && form.userPassword.value !== input;
    const inputError = id !== 'userId' && !regex.test(input);

    if (userIdError || userPasswordNotEqual || inputError) {
      error = true;
    } else {
      error = false;
    }

    this.setState((state) => ({
      form: {
        ...state.form,
        [id]: { value: input, showError: error },
      },
    }));
  }

  renderSubmitBtn = () => {
    const { signup, title } = this.props;
    return (
      <Route
        render={({ history }) => (
          <button
            onClick={
              (e) => (!signup
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
    const { signup } = this.props;
    const { form } = this.state;

    const inputsInfos = signup ? signupInfos : signinInfos;

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

  render() {
    const { signup } = this.props;
    return (
      <form className="login_form">
        <div className="login_inputs">
          {this.renderInputs()}
        </div>

        <div className="login_submit">
          {this.renderSubmitBtn()}
          <div className="login_check_help">
            {!signup && this.renderSignInBottom()}
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
