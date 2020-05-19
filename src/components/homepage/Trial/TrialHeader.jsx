import React from 'react';
import './TrialHeader.css';
import { Link } from 'react-router-dom';
import { NETFLIX_LOGO } from './../../../constants';

const TrialHeader = () => (
  <div className="trial_header_container">
    <img
      className="trial_header_logo"
      src={NETFLIX_LOGO}
      alt="Netflix Logo"
    />
    <Link to="/login">
      <button type="button" className="trial_header_signin_btn">
        Sign in
      </button>
    </Link>
  </div>
);

export default TrialHeader;
