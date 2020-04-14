import React from 'react';
import PropTypes from 'prop-types';

import CarouselSlider from './carousel/CarouselSlider';
import { getMovies } from '../../Api';

class Lists extends React.Component {
  state = {
    nowPlaying: null,
    popular: null,
    upcoming: null,
    similar: null,
    loading: true,
  }

  componentDidMount = async () => {
    const requestPaths = ['movie/now_playing', 'movie/popular', 'movie/upcoming', 'discover/tv'];

    const moviesList = await Promise.all(requestPaths.map((movie, idx) => getMovies(movie, idx + 1)));

    const [nowPlaying, popular, upcoming, similar] = moviesList.map((movie) => movie.data.results);

    this.setState({
      nowPlaying, popular, upcoming, similar, loading: false,
    });
  }

  render() {
    // const res = this.handleGetList('movie/now_playing');
    // console.log(res);
    const {
      nowPlaying, popular, upcoming, loading, similar,
    } = this.state;

    const { handleExpand, activeId, sectionName } = this.props;
    if (loading) {
      return null;
    }

    return (
      <div>
        <CarouselSlider
          handleExpand={handleExpand}
          activeId={activeId}
          title="Continue watching"
          movies={nowPlaying}
          sectionName={sectionName}
          imageRootPath="https://image.tmdb.org/t/p/original"
        />
        <CarouselSlider
          handleExpand={handleExpand}
          activeId={activeId}
          title="Popular"
          movies={popular}
          sectionName={sectionName}

          imageRootPath="https://image.tmdb.org/t/p/original"
        />
        <CarouselSlider
          handleExpand={handleExpand}
          activeId={activeId}
          title="Series EUA"
          movies={upcoming}
          sectionName={sectionName}

          imageRootPath="https://image.tmdb.org/t/p/original"
        />
        <CarouselSlider
          handleExpand={handleExpand}
          activeId={activeId}
          title="Action"
          movies={similar}
          sectionName={sectionName}

          imageRootPath="https://image.tmdb.org/t/p/original"
        />
      </div>
    );
  }
}

Lists.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string,
      PropTypes.arrayOf(PropTypes.number)]),
  ).isRequired,
};

export default Lists;
