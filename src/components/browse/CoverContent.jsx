import React from 'react';
import PropTypes from 'prop-types';

import './CoverContent.css';

import CarouselSlider from './carousel/CarouselSlider';
import Lists from './Lists';
import { ReactComponent as Play } from '../../assets/images/play.svg';
import { ReactComponent as Info } from '../../assets/images/info.svg';


const CoverContent = ({
  movies, handleItemExpand, activeId, sectionName, genres, currentPage, imageRootPath,
}) => (
  <div className="cover_container">
    <div id="video-container">
      <img src={imageRootPath + movies[11].backdrop_path} alt="img" />
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
          <Play />
          <p>Watch</p>
        </button>
        <button type="button" className="btn_watch">
          <Info />
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
  imageRootPath: PropTypes.string,
  title: PropTypes.string,
  handleItemExpand: PropTypes.func.isRequired,
  sectionName: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
};

CoverContent.defaultProps = {
  imageRootPath: 'https://image.tmdb.org/t/p/original',
  sectionName: '',
  title: '',
};

export default CoverContent;
