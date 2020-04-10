import React from 'react';
import Header from './Trial/Header';
import UserFreeTry from './Trial/UserFreeTry';
import './Trial.css';

const Trial = () => (
  <div className="trial_container">
    <div className="trial_container_layer">
      <Header />
      <UserFreeTry />
    </div>
  </div>
);

export default Trial;
