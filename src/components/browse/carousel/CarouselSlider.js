import React from "react";
import "./Carousel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ItemItemsCard from "./ItemItemsCard";

class CarouselSlider extends React.Component {
  state = {
    removeMargin: false,
    mute: false,
  };

  handleClick = (e) => {
    this.setState(state => ({mute: !state.mute}))
  }

  render() {
    const { movies, imageRootPath } = this.props;
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

    return (
      <div className="carousel__container">
        <p style={{ marginLeft: "9vw", transition: "all 0.8s ease" }}>
          {this.props.title}
        </p>
        <Carousel
          swipeable={true}
          draggable={true}
          arrows={false}
          // partialVisible={true}
          // minimumTouchDrag={10}
          customButtonGroup={
            <ButtonGroup removeMargin={this.state.removeMargin} />
          }
          // showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          beforeChange={(nextSlide, { currentSlide, onMove }) => {
            this.setState({ removeMargin: true });
          }}
          keyBoardControl={false}
          customTransition="all .5s ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["mobile"]}
          deviceType={this.props.deviceType}
          itemClass="carousel-item"
        >
          {movies.map((movie) => (
            <div
              key={movie["id"]}
              className="carousel-img"
              style={{
                position: "relative",
                zIndex: "0",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${
                  imageRootPath + movie["backdrop_path"]
                })`,
              }}
            >
              <div className="item-informations">
                <div className="item-card-interaction">
                  <div className="item-play">
                    <ItemItemsCard icon="fas fa-play" size="big" />
                    <span className="item-title">{movie.title}</span>
                  </div>
                  <div className="item-actions">
                    <ItemItemsCard
                      onClick={this.handleClick}
                      icon={
                        this.state.mute
                          ? "fas fa-volume-mute"
                          : "fas fa-volume-up"
                      }
                      size="small"
                    />
                    <ItemItemsCard icon="far fa-thumbs-up" size="small" />
                    <ItemItemsCard icon="far fa-thumbs-down" size="small" />
                    {/* <ItemItemsCard icon="fas fa-check" size="small" /> */}
                  </div>
                </div>
                <div className="item-more-infos-icon">
                  <svg>
                    <path
                      fill="#fff"
                      d="M59.5615866,2.44258873 L31.1899791,17.6617954 C30.7515658,17.9123173 30.2505219,18.1002088 30.0626305,18.1002088 C29.874739,18.1002088 29.6242171,18.0375783 29.5615866,18.0375783 C29.4363257,17.9749478 28.9979123,17.7244259 28.559499,17.5365344 L0.501043841,2.44258873 C0.187891441,2.31732777 0,1.94154489 0,1.62839248 C0,1.50313152 0.0626304802,1.37787056 0.12526096,1.18997912 L0.501043841,0.501043841 C0.688935282,0.187891441 1.00208768,0 1.31524008,0 C1.50313152,0 1.62839248,0 1.75365344,0.12526096 L29.1858038,14.8434238 C29.3736952,14.9686848 29.6868476,15.0313152 30,15.0313152 C30.3131524,15.0313152 30.6263048,14.9686848 30.8141962,14.8434238 L58.2463466,0.12526096 C58.6847599,-0.12526096 59.2484342,0 59.4989562,0.501043841 L59.874739,1.18997912 C60.125261,1.62839248 60,2.19206681 59.5615866,2.44258873"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="carousel-button-group" style={{ position: "absolute" }}>
      <button
        className="btn-left"
        onClick={() => previous()}
        className={currentSlide === 0 ? "disable" : ""}
      >
        <svg className="svg-icon-arrow-left" viewBox="0 0 20 20">
          <path d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
        </svg>
      </button>
      <button className="btn-rigth" onClick={() => next()}>
        <svg className="svg-icon-arrow-rigth" viewBox="0 0 20 20">
          <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
        </svg>
      </button>
    </div>
  );
};

export default CarouselSlider;
