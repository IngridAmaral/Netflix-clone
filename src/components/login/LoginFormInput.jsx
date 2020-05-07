import React from 'react';
import PropTypes from 'prop-types';
import './LoginFormInput.css';

const LoginFormInput = ({
  id, placeholder, inputType, errorMsg, value, showError, onChange,
}) => {
  const labelStyle = { padding: '.3rem 0 0 .9rem', fontSize: '.9rem' };
  const inputStyle = { paddingTop: '1.6rem', paddingBottom: '.6rem' };
  const errorStyleBorder = { borderBottom: '.1rem solid #E87C03' };
  const userLength = value.length > 0;

  const styleLabel = userLength ? labelStyle : {};
  const styleInput = userLength ? inputStyle : {};
  return (
    <div className="login_input">
      <label style={styleLabel} htmlFor={id}>
        {placeholder}
      </label>
      <input
        autoComplete='off'
        onChange={onChange}
        value={value}
        id={id}
        style={{ ...styleInput, ...(showError ? errorStyleBorder : {}) }}
        type={inputType}
      />
      <p className={`error ${showError ? 'show_error' : ''}`}>{errorMsg}</p>
    </div>
  );
};

LoginFormInput.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  errorMsg: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showError: PropTypes.bool,
};

LoginFormInput.defaultProps = {
  showError: false,
};

export default LoginFormInput;
