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
      handleItemExpand, allMovies, allSeries, activeId, sectionName, genres, currentPage,
    } = this.props;
    let render = allMovies;

    console.log(currentPage);

    switch (currentPage) {
      case 'Start':
        render = [...allMovies, ...allSeries];
        break;
      case 'Series':
        render = allSeries;
        break;
      case 'Most Recent':
        render = allMovies;
        break;
      case 'Movies':
        render = allMovies;
        break;
      default:
        render = allMovies;
    }
    // console.log(allMovies);

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
