import React from 'react';
import './LoginFooter.css';

const LoginFooter = () => (
  <div className="footerLogin_container">
    <p>Questions? Call 0800-724-0697</p>
    <div className="links">
      <p>Gift Card Terms</p>
      <p> Terms of Use</p>
      <p> Privacy Statement</p>
    </div>
    <div className="footerLogin_language_selector">
      <select>
        <option>English</option>
        <option>Deutsch</option>
      </select>
    </div>
  </div>
);

export default LoginFooter;
