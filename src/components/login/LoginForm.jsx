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
    id: 'userSignInPassword',
    placeholder: 'Password',
    inputType: 'password',
    errorMsg: 'Your password must contain between 4 and 60 characters.',
  },
];

const signInKeys = ['userId', 'userSignInPassword'];

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

const signUpKeys = ['userName', 'userEmail', 'userPhone', 'userPassword', 'userPasswordRepeat'];

class LoginForm extends React.Component {
  state = {
    userInput: '',
    lastInputId: '',
    rememberMe: false,
    userSignUp: {},
    userSignIn: {},
  };

  handleSubmit = (e, history) => {
    e.preventDefault();
    const { signup, dispatch, users } = this.props;
    const { userSignIn } = this.state;

    if (signup) {
      const { userSignUp } = this.state;
      const newUserKeys = Object.keys(userSignUp);

      if (newUserKeys.length === 5) {
        let newUser = {};
        newUserKeys.forEach((id) => {
          const userId = userSignUp.userEmail.userEmail;
          newUser = {
            [userId]: {
              ...newUser[userId],
              [id]: userSignUp[id][id],
            },
          };
        });

        dispatch(addUser(newUser));

        this.setState({
          userInput: '',
          lastInputId: '',
          rememberMe: false,
          userSignUp: {},
          userSignIn: {},
        });
      } else {
        this.handleInputEmpty('signUp');
      }
    } else {
      const userSignInKeys = Object.keys(userSignIn);

      if (userSignInKeys.length === 2) {
        if (users[userSignIn.userId.userId]) {
          const usersPassword = users[userSignIn.userId.userId].userPassword;
          const signInPassword = userSignIn.userSignInPassword.userSignInPassword;

          if (signInPassword === usersPassword) {
            window.localStorage.setItem('activeUser', JSON.stringify(users[userSignIn.userId.userId]));
            history.push('/browse');
          }
          this.handleIncorrectTypeInput('userSignInPassword');
        } else {
          this.handleIncorrectTypeInput('userId');
          this.handleIncorrectTypeInput('userSignInPassword');
        }
      } else {
        this.handleInputEmpty('signIn');
      }
    }
  };

  handleIncorrectTypeInput = (id) => {
    this.setState((state) => ({
      userSignIn: {
        ...state.userSignIn,
        [id]: { [id]: '', showError: true },
      },
    }));
  };

  handleInputEmpty = (sign) => {
    const { userSignIn, userSignUp } = this.state;

    const mapWhichSign = sign === 'signIn' ? signInKeys : signUpKeys;
    const stateSign = sign === 'signIn' ? userSignIn : userSignUp;
    const signString = sign === 'signIn' ? 'userSignIn' : 'userSignUp';
    mapWhichSign.forEach((id) => {
      if (!stateSign[id]) {
        this.setState((state) => ({
          [signString]: {
            ...state[signString],
            [id]: { [id]: '', showError: true },
          },
        }));
      }
    });
  };

  handleOnChange = (e) => {
    const { id } = e.target;
    const input = e.target.value;

    this.setState({
      userInput: input,
      lastInputId: id,
    });

    this.validateInput(input, id);
  };

  validateInput = (input, id) => {
    const { signup } = this.props;
    const { userSignUp } = this.state;
    let error = false;
    let regex = null;
    let regex2 = null;

    switch (id) {
      case 'userId':
        regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
        regex2 = /^[2-9]\d{2}\d{3}\d{4}$/;
        break;
      case 'userEmail':
        regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
        break;
      case 'userPhone':
        regex = /^[2-9]\d{2}\d{3}\d{4}$/;
        break;
      case 'userName':
        regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        break;
      case 'userSignInPassword':
      case 'userPassword':
      case 'userPasswordRepeat':
        regex = /^.{4,60}$/;
        break;
      default:
        regex = null;
        regex2 = null;
    }

    if (regex) {
      if (id === 'userId' && !regex.test(input) && !regex2.test(input)) {
        error = true;
      } else if (!regex.test(input)) {
        error = true;
      } else if (
        id === 'userPasswordRepeat'
        && userSignUp.userPassword.userPassword !== input
      ) {
        error = true;
      } else {
        error = false;
      }
    }

    const signString = signup ? 'userSignUp' : 'userSignIn';

    this.setState((state) => ({
      [signString]: {
        ...state[signString],
        [id]: { [id]: input, showError: error },
      },
    }));
  };

  render() {
    const { title, signup } = this.props;
    const renderInputsArr = signup ? signupInfos : signinInfos;
    return (
      <form className="login_form">
        <div className="login_inputs">
          {renderInputsArr.map((input) => {
            const {
              id, placeholder, inputType, errorMsg,
            } = input;
            const { userSignIn, userSignUp } = this.state;
            let value = '';
            let showError = false;
            if (userSignUp[id]) {
              showError = userSignUp[id].showError;
              value = userSignUp[id][id];
            }

            if (userSignIn[id]) {
              showError = userSignIn[id].showError;
              value = userSignIn[id][id];
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
          })}
        </div>

        <div className="login_submit">
          <Route render={({ history }) => (
            <button onClick={(e) => this.handleSubmit(e, history)} type="submit">
              {title}
            </button>
          )}
          />

          <div className="login_check_help">
            {!signup && (
              <div>
                <label
                  className="login_checkbox_container"
                  htmlFor="rememberMe"
                >
                  <input
                    onClick={() => this.setState((state) => ({
                      rememberMe: !state.rememberMe,
                    }))}
                    id="rememberMe"
                    className="checkbox"
                    type="checkbox"
                  />
                  <span className="checkmark" />
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
