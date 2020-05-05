
import React from 'react';
import PropTypes from 'prop-types';

import './ButtonGroup.css';

import { ReactComponent as ArrowRight } from '../../../assets/images/arrowRight.svg';
import { ReactComponent as ArrowLeft } from '../../../assets/images/arrowLeft.svg';

const ButtonGroup = ({
  next, previous,
}) => (
  <div className="carousel-button-group" style={{ position: 'absolute' }}>
    <button
      type="button"
      className="btn-left"
      onClick={previous}
    >
      <ArrowLeft />
    </button>
    <button type="button" className="btn-right" onClick={next}>
      <ArrowRight />
    </button>
  </div>
);

ButtonGroup.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
};

ButtonGroup.defaultProps = {
  next: PropTypes.string,
  previous: PropTypes.string,
};

export default ButtonGroup;
