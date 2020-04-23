import React from 'react';
import PropTypes from 'prop-types';

import CarouselSlider from './carousel/CarouselSlider';
import { getMovie, getSeries } from '../../Api';

class Lists extends React.Component {
  state = {
    movies: null,
    series: null,
    loading: true,
  }

  componentDidMount = async () => {
    const movies = await Promise.all(getMovie());
    const series = await Promise.all(getSeries());
    this.setState({
      loading: false, movies, series,
    });
  }

  renderNewList = () => {
    const {
      handleItemExpand, allMovies, activeId, sectionName, genres, currentPage,
    } = this.props;
    const { movies, series } = this.state;
    let render = [...movies, ...series];
    let sectionNames = ['Top rated', 'Now Playing', 'Discover', 'Popular', 'Latest', 'Discover Series', 'Airing Today', 'On The Air', 'Popular', 'Top Rated'];

    switch (currentPage) {
      case 'Start':
        render = [...allMovies];
        break;
      case 'Series':
        render = series;
        sectionNames = ['Latest', 'Discover Series', 'Airing Today', 'On The Air', 'Popular', 'Top Rated'];
        break;
      case 'Most Recent':
        render = series;
        sectionNames = ['Latest', 'Discover Series', 'Airing Today', 'On The Air', 'Popular', 'Top Rated'];
        break;
      case 'Movies':
        render = movies;
        sectionNames = ['Upcoming', 'Trending', 'Now Playing', 'Popular'];
        break;
      default:
        render = movies;
        sectionNames = ['Latest', 'Discover Series', 'Airing Today', 'On The Air', 'Popular', 'Top Rated'];
    }

    return render.map((section) => (
      <CarouselSlider
        key={`${currentPage}-${section[0]}-list `}
        handleItemExpand={handleItemExpand}
        activeId={activeId}
        title={section[0]}
        movies={section[1]}
        sectionName={sectionName}
        genres={genres}
        imageRootPath="https://image.tmdb.org/t/p/original"
      />
    ));
  }

  render() {
    const {
      loading,
    } = this.state;

    if (loading) {
      return null;
    }
    return (
      this.renderNewList()
    );
  }
}

Lists.propTypes = {
  handleItemExpand: PropTypes.func.isRequired,
  sectionName: PropTypes.string,
};

Lists.defaultProps = {
  sectionName: '',
};

export default Lists;
