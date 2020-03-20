import React from "react";
import "./Form.css";

class Form extends React.Component {
  render() {
    return (
      <div className='form_container'>
        <h5>Ready to watch? Enter your email to create or access your account.</h5>
        <form className="form_form">
          <input placeholder="Email address" />
          <button className="form_btn">TRY 30 DAYS FREE  ></button>
        </form>
      </div>
    );
  }
}

export default Form;
