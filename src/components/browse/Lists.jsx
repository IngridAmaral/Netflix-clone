import React from 'react';
import PropTypes from 'prop-types';

import CarouselSlider from './carousel/Carousel';

class Lists extends React.Component {
  state = {
    loading: true,
  }

  componentDidMount = async () => {
    this.setState({
      loading: false,
    });
  }

  renderNewList = () => {
    const {
      handleItemExpand, movies, series, activeId, activeKey, currentPage, section,
    } = this.props;
    let render = movies;

    switch (currentPage) {
      case 'Start':
        render = [...movies, ...series];
        break;
      case 'Series':
        render = series;
        break;
      case 'Most Recent':
        render = movies;
        break;
      case 'Movies':
        render = movies;
        break;
      default:
        render = movies;
    }

    return render.map((movie) => (
      <CarouselSlider
        key={`${currentPage}-${movie.title}-list `}
        handleItemExpand={handleItemExpand}
        activeId={activeId}
        title={movie.title}
        movies={movie.movies}
        activeKey={activeKey}
        isResultPage={false}
        section={section}
        isInfinite
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
  activeKey: PropTypes.string,
  activeId: PropTypes.arrayOf(PropTypes.object),
  section: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  series: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Lists.defaultProps = {
  activeKey: '',
  activeId: [],
  section: 'upcoming',
};

export default Lists;
