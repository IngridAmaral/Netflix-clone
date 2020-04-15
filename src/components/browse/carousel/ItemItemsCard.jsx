import React from 'react';
import PropTypes from 'prop-types';
import './ItemItemsCard.css';

const ItemItemsCard = ({ icon, onClick }) => (
  <button type="button" onClick={onClick} className="icon-card small">
    <i className={icon} />
  </button>
);

ItemItemsCard.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ItemItemsCard.defaultProps = {
  onClick: PropTypes.string,
};

export default ItemItemsCard;
