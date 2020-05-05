import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';
import CarouselSlider from './carousel/Carousel';

const SearchResults = ({
  handleItemExpand,
  activeKey,
  activeId,
  section,
  resultChunks,
}) => (
  <div className="search">
    <div className="search-centered">
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
        />
      ))}
    </div>
  </div>
);

SearchResults.propTypes = {
  handleItemExpand: PropTypes.func.isRequired,
  activeKey: PropTypes.string,
  activeId: PropTypes.arrayOf(),
  section: PropTypes.string,
  resultChunks: PropTypes.arrayOf(PropTypes.array).isRequired,
};

SearchResults.defaultProps = {
  activeKey: '',
  activeId: [],
  section: 'upcoming',
};

export default SearchResults;
