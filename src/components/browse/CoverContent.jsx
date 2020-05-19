import React from 'react';
import PropTypes from 'prop-types';

import './CoverContent.css';

import Lists from './Lists';
import { ReactComponent as Play } from '../../assets/images/play.svg';
import { ReactComponent as Info } from '../../assets/images/info.svg';
import { IMAGE_ROOT_PATH } from '../../constants';

const getCover = (currentPage, movies, series) => {
  switch (currentPage) {
    case 'Start':
      return movies[1].movies[1];
    case 'Series':
      return series[0].movies[2];
    case 'Most Recent':
      return movies[0].movies[1];
    case 'Movies':
      return movies[3].movies[6];
    default:
      return movies[2].movies[6];
  }
};

const CoverContent = ({
  handleItemExpand, movies, series, activeId, activeKey, currentPage, section,
}) => {
  const cover = getCover(currentPage, movies, series);
  return (
    <div className="cover_container">
      <div id="video-container">
        <img src={IMAGE_ROOT_PATH + cover.backdrop_path} alt="img" />
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
          <button type="button" className="btn_cover">
            <Play />
            <p>Watch</p>
          </button>
          <button type="button" className="btn_cover">
            <Info />
            <p>Informations</p>
          </button>
        </div>
      </div>
      <Lists
        currentPage={currentPage}
        activeKey={activeKey}
        handleItemExpand={handleItemExpand}
        activeId={activeId}
        movies={movies}
        series={series}
        section={section}
      />
    </div>
  );
};

CoverContent.propTypes = {
  handleItemExpand: PropTypes.func.isRequired,
  activeKey: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
  activeId: PropTypes.arrayOf(),
  section: PropTypes.string,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  series: PropTypes.arrayOf(PropTypes.object).isRequired,
};

CoverContent.defaultProps = {
  activeKey: '',
  activeId: [],
  section: 'upcoming',
};

export default CoverContent;
