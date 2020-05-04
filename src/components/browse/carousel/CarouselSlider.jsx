import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';

import './Carousel.css';
import 'react-multi-carousel/lib/styles.css';

import Item from './Item';
import Expansion from './Expansion';
import { IMAGE_ROOT_PATH } from '../../../imageRootPath';
import ButtonGroup from './ButtonGroup';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1060 },
    items: 5.5,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1060, min: 800 },
    items: 4,
    slidesToSlide: 3,
  },
  smallerDevice: {
    breakpoint: { max: 800, min: 500 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

class CarouselSlider extends React.Component {
  state = {
    removeMargin: false,
    mute: false,
  };

  handleClick = () => {
    this.setState((state) => ({ mute: !state.mute }));
  }

  render() {
    const {
      title,
      activeId,
      movies,
      handleItemExpand,
      activeKey,
      isResultPage,
      isInfinite,
      section,
    } = this.props;
    const { removeMargin } = this.state;
    const checkRow = movies.some((mov) => {
      if (mov.id + title.toLowerCase().replace(/ /g, '') === activeKey) { return true; }
    });

    const isSearch = isResultPage ? '' : title;
    const shouldRenderBtns = activeId || isResultPage ? '' : <ButtonGroup removeMargin={removeMargin} />;
    return (
      <div className="carousel__container">
        <p style={{ marginLeft: '9vw', transition: 'all 0.8s ease' }}>
          {isSearch}
        </p>
        <Carousel
          swipeable
          draggable
          arrows={false}
          customButtonGroup={
            shouldRenderBtns
          }
          responsive={responsive}
          // eslint-disable-next-line react/jsx-boolean-value
          infinite={isInfinite}
          autoPlay={false}
          beforeChange={() => {
            this.setState({ removeMargin: true });
          }}
          keyBoardControl={false}
          customTransition="all .5s ease-in-out"
          transitionDuration={500}
          containerClass={`carousel-container ${(activeId && checkRow) || isResultPage ? 'block-container' : 'hover-container'}`}
          removeArrowOnDeviceType={['mobile']}
          deviceType={this.props.deviceType}
          itemClass={`carousel-item ${activeId && checkRow ? 'block-item' : 'hover-item'}`}
        >
          {movies.map((movie) => (
            <Item
              key={movie.id}
              movie={movie}
              image={IMAGE_ROOT_PATH + movie.poster_path}
              activeId={activeId}
              handleItemExpand={handleItemExpand}
              title={title}
              activeKey={activeKey}
              isResultPage={isResultPage}
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
  movies: PropTypes.arrayOf({}).isRequired,
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
