import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';
import CarouselSlider from './carousel/CarouselSlider';

const SearchResults = ({
  handleItemExpand,
  activeKey,
  activeId,
  section,
  resultChunks,
}) => (
  <div className="search">
    {resultChunks.map((movieChunk, idx) => (
      <CarouselSlider
        key={`results${idx}row`}
        handleItemExpand={handleItemExpand}
        activeId={activeId}
        title={`results${idx}row`}
        movies={movieChunk}
        activeKey={activeKey}
        isResultPage
        section={section}
        isInfinite={false}
        imageRootPath="https://image.tmdb.org/t/p/original"
      />
    ))}
  </div>

);

SearchResults.propTypes = {
  currentPage: PropTypes.string,
  renderItems: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

SearchResults.defaultProps = {
  currentPage: 'Start',
};

export default SearchResults;
