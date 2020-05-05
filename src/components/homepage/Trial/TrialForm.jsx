import React from 'react';
import './TrialForm.css';

const TrialForm = () => (
  <div className="form_container">
    <h5>Ready to watch? Enter your email to create or access your account.</h5>
    <form className="form_form">
      <input placeholder="Email address" />
      <button type="button" className="form_btn">TRY 30 DAYS FREE  &gt;</button>
    </form>
  </div>
);


export default TrialForm;
