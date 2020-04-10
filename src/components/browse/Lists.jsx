import React from 'react';
import PropTypes from 'prop-types';
import CarouselSlider from './carousel/CarouselSlider';

const Lists = ({ movies }) => (
  <div>
    <CarouselSlider
      title="Continue watching"
      movies={movies}
      imageRootPath="https://image.tmdb.org/t/p/original"
    />
  </div>
);

Lists.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string,
      PropTypes.arrayOf(PropTypes.number)]),
  ).isRequired,
};

export default Lists;
