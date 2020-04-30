import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.css';
import 'react-multi-carousel/lib/styles.css';

import Carousel from 'react-multi-carousel';
import Item from './Item';
import Expansion from './Expansion';
import { IMAGE_ROOT_PATH } from '../../../assets/imageRootPath';


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

const ButtonGroup = ({
  next, previous,
}) => (
  <div className="carousel-button-group" style={{ position: 'absolute' }}>
    <button
      type="button"
      className="btn-left"
      onClick={() => previous()}
    >
      <svg className="svg-icon-arrow-left" viewBox="0 0 20 20">
        <path d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z" />
      </svg>
    </button>
    <button type="button" className="btn-rigth" onClick={() => next()}>
      <svg className="svg-icon-arrow-rigth" viewBox="0 0 20 20">
        <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z" />
      </svg>
    </button>
  </div>
);

ButtonGroup.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
};

ButtonGroup.defaultProps = {
  next: PropTypes.string,
  previous: PropTypes.string,
};

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
