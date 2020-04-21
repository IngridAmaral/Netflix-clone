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
      handleItemExpand, activeId, sectionName, genres, currentPage,
    } = this.props;
    const { movies, series, lastPage } = this.state;
    let render = [...movies, ...series];
    let sectionNames = ['Top rated', 'Now Playing', 'Discover', 'Popular', 'Latest', 'Discover Series', 'Airing Today', 'On The Air', 'Popular', 'Top Rated'];

    switch (currentPage) {
      case 'Start':
        render = [...movies, ...series];
        sectionNames = ['Top rated', 'Now Playing', 'Discover', 'Popular', 'Latest', 'Discover Series', 'Airing Today', 'On The Air', 'Popular', 'Top Rated'];
        break;
      case 'Series':
        // console.log('here');
        render = series;
        sectionNames = ['Latest', 'Discover Series', 'Airing Today', 'On The Air', 'Popular', 'Top Rated'];
        break;
      case 'Most Recent':
        render = series;
        sectionNames = ['Latest', 'Discover Series', 'Airing Today', 'On The Air', 'Popular', 'Top Rated'];
        break;
      default:
        render = movies;
        sectionNames = ['Latest', 'Discover Series', 'Airing Today', 'On The Air', 'Popular', 'Top Rated'];
    }

    console.log('render ', render, currentPage, lastPage !== currentPage);

    return render.map((list, idx) => (
      <CarouselSlider
        handleItemExpand={handleItemExpand}
        activeId={activeId}
        title={sectionNames[idx]}
        movies={list}
        sectionName={sectionName}
        genres={genres}
        imageRootPath="https://image.tmdb.org/t/p/original"
      />
    ));
  }

  render() {
    const {
      loading, movies,
    } = this.state;

    if (loading) {
      return null;
    }
    return (
      movies && (this.renderNewList())
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
