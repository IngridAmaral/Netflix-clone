import React from 'react';
import PropTypes from 'prop-types';

import './CoverContent.css';

import Lists from './Lists';
import { ReactComponent as Play } from '../../assets/images/play.svg';
import { ReactComponent as Info } from '../../assets/images/info.svg';

const getCover = (currentPage, movies, series) => {
  switch (currentPage) {
    case 'Start':
      return movies[0][1][11];
    case 'Series':
      return series[2][1][11];
    case 'Most Recent':
      return movies[1][1][11];
    case 'Movies':
      return movies[0][1][1];
    default:
      return movies[0][1][11];
  }
};

const CoverContent = ({
  handleItemExpand, movies, series, activeId, activeKey, genres, currentPage, imageRootPath,
}) => {
  const cover = getCover(currentPage, movies, series);
  return (
    <div className="cover_container">
      <div id="video-container">
        <img src={imageRootPath + cover.backdrop_path} alt="img" />
      </div>
      <div className="layer_informations">
        <div className="trailer_title">
          <h1>{cover.title || cover.original_name}</h1>
          <h5>
            {cover.overview.slice(0, 100)}
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
      <Lists
        currentPage={currentPage}
        activeKey={activeKey}
        genres={genres}
        handleItemExpand={handleItemExpand}
        activeId={activeId}
        movies={movies}
        series={series}
      />
    </div>
  );
};


CoverContent.propTypes = {
  imageRootPath: PropTypes.string,
  handleItemExpand: PropTypes.func.isRequired,
  activeKey: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
};

CoverContent.defaultProps = {
  imageRootPath: 'https://image.tmdb.org/t/p/original',
  activeKey: '',
};

export default CoverContent;
