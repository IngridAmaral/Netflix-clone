import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';

import './Carousel.css';
import 'react-multi-carousel/lib/styles.css';

import CarouselItem from './CarouselItem';
import Expansion from './Expansion';
import { IMAGE_ROOT_PATH } from '../../../constants';
import ButtonGroup from './ButtonGroup';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1060 },
    items: 5.5,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1060, min: 800 },
    items: 4,
    slidesToSlide: 2,
  },
  smallerDevice: {
    breakpoint: { max: 800, min: 500 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

class CarouselSlider extends React.Component {
  checkIsResultPage = () => {
    const { isResultPage } = this.props;
    return !!isResultPage;
  }

  render() {
    const {
      title,
      activeId,
      movies,
      handleItemExpand,
      activeKey,
      isInfinite,
      section,
    } = this.props;
    const checkRow = movies.some((mov) => {
      if (mov.id + title.toLowerCase().replace(/ /g, '') === activeKey) { return true; }
      return null;
    });

    const isSearch = this.checkIsResultPage() ? '' : title;
    const shouldRenderBtns = activeId || this.checkIsResultPage() ? '' : <ButtonGroup />;
    return (
      <div className="carousel__container">
        <p style={{ marginLeft: '9vw', transition: 'all 0.8s ease' }}>
          {isSearch}
        </p>
        <Carousel
          swipeable
          draggable
          arrows={false}
          customButtonGroup={shouldRenderBtns}
          responsive={responsive}
          // eslint-disable-next-line react/jsx-boolean-value
          infinite={isInfinite}
          autoPlay={false}
          keyBoardControl={false}
          customTransition="all .5s ease-in-out"
          transitionDuration={500}
          containerClass={`carousel-container ${(activeId && checkRow) || this.checkIsResultPage() ? 'block-container' : 'hover-container'}`}
          removeArrowOnDeviceType={['mobile']}
          deviceType={this.props.deviceType}
          itemClass={`carousel-item ${activeId && checkRow ? 'block-item' : 'hover-item'}`}
        >
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              movie={movie}
              image={IMAGE_ROOT_PATH + movie.poster_path}
              activeId={activeId}
              handleItemExpand={handleItemExpand}
              title={title}
              activeKey={activeKey}
              isResultPage={this.checkIsResultPage()}
              section={section}
            />
          ))}
        </Carousel>
        {
          activeId && (
          <Expansion
            activeId={activeId}
            image={activeId ? IMAGE_ROOT_PATH + activeId.backdrop_path : ''}
            handleItemExpand={handleItemExpand}
            activeKey={activeKey}
            title={title}
          />
          )
        }
      </div>
    );
  }
}

CarouselSlider.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  handleItemExpand: PropTypes.func.isRequired,
  activeKey: PropTypes.string,
  activeId: PropTypes.arrayOf(String),
  isResultPage: PropTypes.bool.isRequired,
  isInfinite: PropTypes.bool,
  section: PropTypes.string.isRequired,
};

CarouselSlider.defaultProps = {
  activeKey: '',
  isInfinite: true,
  activeId: [],
};

export default CarouselSlider;
