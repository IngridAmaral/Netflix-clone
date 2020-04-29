import React from 'react';
import PropTypes from 'prop-types';

import CarouselSlider from './carousel/CarouselSlider';

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
        key={`${currentPage}-${movie[0]}-list `}
        handleItemExpand={handleItemExpand}
        activeId={activeId}
        title={movie[0]}
        movies={movie[1]}
        activeKey={activeKey}
        isResultPage={false}
        section={section}
        isInfinite
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
  activeKey: PropTypes.string,
};

Lists.defaultProps = {
  activeKey: '',
};

export default Lists;
