import React from 'react';
import PropTypes from 'prop-types';

import './Item.css';

import { ReactComponent as PlayRing } from '../../../assets/images/playWithRing.svg';
import { ReactComponent as ChevronDown } from '../../../assets/images/chevronDown.svg';
import { ReactComponent as ThumbDown } from '../../../assets/images/thumbDown.svg';
import { ReactComponent as ThumbUp } from '../../../assets/images/thumbUp.svg';
import { ReactComponent as AudioOff } from '../../../assets/images/audioOff.svg';
import { ReactComponent as AudioOn } from '../../../assets/images/audioOn.svg';

class Item extends React.Component {
    state = { mute: false }

    handleAudio = () => {
      this.setState((state) => ({ mute: !state.mute }));
    }

    render() {
      const { mute } = this.state;
      const {
        movie, handleItemExpand, activeId, title, sectionName, image,
      } = this.props;

      const itemStyle = {
        position: 'relative',
        zIndex: '0',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${
          image
        })`,
        outline: `${activeId && title === sectionName ? 'none' : ''}`,
        opacity: `${activeId && title === sectionName && activeId.id !== movie.id ? '85%' : '100%'}`,
        border: `${activeId && activeId.id === movie.id ? '.3vw solid white' : ''}`,
      };

      const relevantCutDecimal = movie.popularity.toString().split('.');
      const relevant = Number(relevantCutDecimal[0]) > 100 ? 9 + (Math.random() * (9 - 0) + 0).toFixed(0) : relevantCutDecimal[0];
      return (
        <div
          key={movie.id}
          className="carousel-img"
          style={itemStyle}
        >
          { activeId && title === sectionName
            ? null
            : (
              <div className="item-informations">
                <div className="item-card-interaction">
                  <div className="item-play">
                    <PlayRing />
                    <span className="item-title">{movie.title || movie.name}</span>
                    <span className="item-relevant">
                      {relevant}
                      % relevant
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

                <div className="item-more-infos-icon" onClick={() => handleItemExpand(movie, title)}>
                  <ChevronDown />
                </div>
              </div>
            )}
          {
              activeId && title === sectionName && activeId.id !== movie.id && (
              <div className="chevron-down-active" onClick={() => handleItemExpand(movie, title)}>
                <ChevronDown />
              </div>
              )
            }
          { activeId && activeId.id === movie.id
            ? (
              <div className="caret-item-open">
                <i className="fas fa-caret-down" />
              </div>
            )
            : null}
        </div>
      );
    }
}

Item.propTypes = {
  handleItemExpand: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  sectionName: PropTypes.string,
  image: PropTypes.string.isRequired,
};

Item.defaultProps = {
  sectionName: '',
};

export default Item;
