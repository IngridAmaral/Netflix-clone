import React from "react";
import CarouselSlider from './carousel/CarouselSlider'

class Lists extends React.Component {
  render() {
      const { movies } = this.props;
    return (
      <div>
        <CarouselSlider
          title={"Continue watching"}
          movies={movies}
          imageRootPath={"https://image.tmdb.org/t/p/original"}
        />
      </div>
    );
  }
}

export default Lists
