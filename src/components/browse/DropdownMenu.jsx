import React from 'react';
import PropTypes from 'prop-types';
import './DropdownMenu.css';

const DropdownMenu = ({ items }) => (
  <div className="dropdown">
    <button type="button" className="dropbtn">
      To browse
      <span className="caret" />
    </button>
    <span className="caret-up" />
    <div className="dropdown-content">
      {items.map((id) => (
        <button
          type="button"
          key={id}
          className="dropdown-item"
        >
          {id}
        </button>
      ))}
    </div>
  </div>
);

DropdownMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DropdownMenu;
