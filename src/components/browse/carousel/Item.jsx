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
        movie, handleItemExpand, activeId, title, activeKey, image, section,
      } = this.props;

      const key = movie.id + title.toLowerCase().replace(/ /g, '');
      const isTheSelectedItem = activeId && key === activeKey;
      const itemStyle = {
        position: 'relative',
        zIndex: '0',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${
          image
        })`,
        outline: `${isTheSelectedItem ? 'none' : ''}`,
        opacity: `${activeId && key !== activeKey && section === title ? '85%' : '100%'}`,
        border: `${activeId && activeId.id === movie.id ? '.3vw solid white' : ''}`,
      };
      const relevantCutDecimal = movie.popularity.toString().split('.');
      const relevant = Number(relevantCutDecimal[0]) > 100
        ? 9 + (Math.random() * (9 - 0) + 0).toFixed(0)
        : relevantCutDecimal[0];
      return (
        <div
          key={key}
          className="carousel-img"
          style={itemStyle}
        >
          { title === section
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
          { isTheSelectedItem
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
  activeKey: PropTypes.string,
  image: PropTypes.string.isRequired,
  movie: PropTypes.arrayOf().isRequired,
  activeId: PropTypes.arrayOf().isRequired,
  section: PropTypes.string.isRequired,
};

Item.defaultProps = {
  activeKey: '',
};

export default Item;
