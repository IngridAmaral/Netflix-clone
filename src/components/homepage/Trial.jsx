import React from 'react';

import './Trial.css';

import TrialHeader from './Trial/TrialHeader';
import UserFreeTry from './Trial/UserFreeTry';

const Trial = () => (
  <div className="trial_container">
    <div className="trial_container_layer">
      <TrialHeader />
      <UserFreeTry />
    </div>
  </div>
);

export default Trial;
