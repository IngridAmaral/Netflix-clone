import React from 'react';
import PropTypes from 'prop-types';

import './CoverContent.css';

import CarouselSlider from './carousel/CarouselSlider';
import Lists from './Lists';

const CoverContent = ({
  movies, handleItemExpand, activeId, sectionName, genres, currentPage,
}) => (
  <div className="cover_container">
    <div id="video-container">
      <img src={`https://image.tmdb.org/t/p/original${movies[11].backdrop_path}`} alt="img" />
    </div>
    <div className="layer_informations">
      <div className="trailer_title">
        <h1>{movies[11].title || movies[11].original_name}</h1>
        <h5>
          {movies[11].overview.slice(0, 100)}
          .
        </h5>
      </div>
      <div className="btns_clip">
        <button type="button" className="btn_watch">
          <span className="caret-rigth" />
          <p>Watch</p>
        </button>
        <button type="button" className="btn_watch">
          <div className="svg-icon-info-container">
            <svg id="svg-icon-info" viewBox="0 0 22 22">
              <path fill="#fff" d="M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M11,7 L11,9 L13,9 L13,7 L11,7 Z M11,11 L11,17 L13,17 L13,11 L11,11 Z" id="path-1" />
            </svg>
          </div>
          <p>Informations</p>
        </button>
      </div>
    </div>
    <CarouselSlider
      title="My List"
      imageRootPath="https://image.tmdb.org/t/p/original"
      activeId={activeId}
      movies={movies}
      handleItemExpand={handleItemExpand}
      sectionName={sectionName}
      genres={genres}
    />
    <Lists
      currentPage={currentPage}
      sectionName={sectionName}
      genres={genres}
      handleItemExpand={handleItemExpand}
      activeId={activeId}
      movies={movies}
    />
  </div>
);

CoverContent.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [PropTypes.number, PropTypes.string,
        PropTypes.arrayOf(PropTypes.number)],
    ),
  ).isRequired,
  getMovies: PropTypes.func,
};

CoverContent.defaultProps = {
  getMovies: PropTypes.string,
};

export default CoverContent;
