import React from 'react';
import PropTypes from 'prop-types';
import './ItemItemsCard.css';

const ItemItemsCard = ({ icon, size, onClick }) => (
  <button type="button" onClick={onClick} className={`icon-card ${size}`}>
    <i className={icon} />
  </button>
);

ItemItemsCard.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ItemItemsCard;
