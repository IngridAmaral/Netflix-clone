import React from 'react';
import './SearchResults.css';
import CarouselSlider from './carousel/CarouselSlider';

class SearchResults extends React.Component {
  render() {
    const {
      genres,
      handleItemExpand,
      activeKey,
      activeId,
      section,
      resultChunks,
    } = this.props;

    return (
      <div className="search">
        {resultChunks.map((movieChunk, idx) => (
          <CarouselSlider
            key={`results${idx}row`}
            handleItemExpand={handleItemExpand}
            activeId={activeId}
            title={`results${idx}row`}
            movies={movieChunk}
            activeKey={activeKey}
            genres={genres}
            isResultPage
            section={section}
            isInfinite={false}
            imageRootPath="https://image.tmdb.org/t/p/original"
          />
        ))}
      </div>

    );
  }
}


export default SearchResults;
