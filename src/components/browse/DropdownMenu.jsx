import React from 'react';
import PropTypes from 'prop-types';
import './DropdownMenu.css';

const DropdownMenu = ({ renderItems, currentPage, onClick }) => (
  <div className="dropdown">
    <button type="button" className="dropbtn">
      To browse
      <span className="caret" />
    </button>
    <span className="caret-up" />
    <div className="dropdown-content">
      {renderItems(currentPage, onClick)}
    </div>
  </div>
);

DropdownMenu.propTypes = {
  currentPage: PropTypes.string,
  renderItems: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

DropdownMenu.defaultProps = {
  currentPage: 'Start',
};

export default DropdownMenu;
