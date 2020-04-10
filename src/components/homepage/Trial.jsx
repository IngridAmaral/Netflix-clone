import React from 'react';

import './Trial.css';

import Header from './Trial/Header';
import UserFreeTry from './Trial/UserFreeTry';

const Trial = () => (
  <div className="trial_container">
    <div className="trial_container_layer">
      <Header />
      <UserFreeTry />
    </div>
  </div>
);

export default Trial;
