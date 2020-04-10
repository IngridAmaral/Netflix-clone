import React from 'react';
import './UserFreeTry.css';
import Infos from './Infos';
import Form from './Form';

class UserFreeTry extends React.Component {
  render() {
    return (
      <div className="userfreetry_container">
        <Infos />
        <Form />
      </div>
    );
  }
}

export default UserFreeTry;
