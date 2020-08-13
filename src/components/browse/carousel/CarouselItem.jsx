import React from 'react';
import PropTypes from 'prop-types';

import './CarouselItem.css';

import { ReactComponent as PlayRing } from '../../../assets/images/playWithRing.svg';
import { ReactComponent as ChevronDown } from '../../../assets/images/chevronDown.svg';
import { ReactComponent as ThumbDown } from '../../../assets/images/thumbDown.svg';
import { ReactComponent as ThumbUp } from '../../../assets/images/thumbUp.svg';
import { ReactComponent as AudioOff } from '../../../assets/images/audioOff.svg';
import { ReactComponent as AudioOn } from '../../../assets/images/audioOn.svg';

class CarouselItem extends React.Component {
    state = { mute: false }

    handleAudio = () => {
      this.setState((state) => ({ mute: !state.mute }));
    }

    render() {
      const { mute } = this.state;
      const {
        movie, handleItemExpand, activeId, title, activeKey, image, section,
      } = this.props;

      const key = movie.id + title.toLowerCase().replace(/ /g, '');
      const isTheSelectedItem = activeId && key === activeKey;
      const itemStyle = {
        backgroundImage: `url(${
          image
        })`,
        outline: `${isTheSelectedItem ? 'none' : ''}`,
        opacity: `${activeId && key !== activeKey && section === title ? '85%' : '100%'}`,
        border: `${activeId && activeId.id === movie.id ? '.3vw solid white' : ''}`,
      };
      const popularityCutDecimal = movie.popularity.toString().split('.');
      const popularity = Number(popularityCutDecimal[0]) > 100
        ? 9 + (Math.random() * (9 - 0) + 0).toFixed(0)
        : popularityCutDecimal[0];
      
      return (
        <div
          key={key}
          className="carousel-img"
          style={itemStyle}
        >
          { title !== section && (
          <div className="item-informations">
            <div className="item-card-interaction">
              <div className="item-play">
                <PlayRing />
                <span className="item-title">{movie.title || movie.name}</span>
                <span className="item-popularity">
                  {popularity}
                  % popularity
                </span>
              </div>
              <div className="item-actions">
                <div onClick={this.handleAudio} className="audio-icon">
                  {mute ? <AudioOff /> : <AudioOn />}
                </div>
                <ThumbUp />
                <ThumbDown />
              </div>
            </div>
            <div className="item-more-infos-icon" onClick={() => handleItemExpand(movie, key, title)}>
              <ChevronDown />
            </div>
          </div>
          )}
          {
              activeId && key !== activeKey && section === title && (
              <div className="chevron-down-active" onClick={() => handleItemExpand(movie, key, title)}>
                <ChevronDown />
              </div>
              )
            }
          { isTheSelectedItem && (
          <div className="caret-item-open">
            <i className="fas fa-caret-down" />
          </div>
          )}
        </div>
      );
    }
}

CarouselItem.propTypes = {
  handleItemExpand: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  activeKey: PropTypes.string,
  image: PropTypes.string.isRequired,
  movie:
    PropTypes.shape({
      backdrop_path: PropTypes.string,
first_air_date: PropTypes.string,
genre_ids: PropTypes.arrayOf(PropTypes.number),
id: PropTypes.number,
name: PropTypes.string,
origin_country: PropTypes.arrayOf(PropTypes.string),
original_language: PropTypes.string,
original_name: PropTypes.string,
overview: PropTypes.string,
popularity: PropTypes.number,
poster_path: PropTypes.string,
vote_average: PropTypes.number,
vote_count: PropTypes.number,
    }),
  activeId: PropTypes.objectOf(PropTypes.object),
  section: PropTypes.string.isRequired,
};

CarouselItem.defaultProps = {
  activeId: {},
  activeKey: '',
  movie: {},
};

export default CarouselItem;
