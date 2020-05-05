import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Expansion.css';

import { ReactComponent as ThumbUp } from '../../../assets/images/thumbUp.svg';
import { ReactComponent as ThumbDown } from '../../../assets/images/thumbDown.svg';
import { ReactComponent as Play } from '../../../assets/images/play.svg';
import { getGenresPending, getGenres, getGenresError } from '../redux/reducers/genres';

const descriptionList = ['overview', 'more like this', 'details'];

class Expansion extends React.Component {
    state = { currentDescription: 'exp-overview' }

    handleClose = () => {
      const { handleItemExpand } = this.props;
      handleItemExpand(null, '');
    }

    getGenre = (ids) => {
      const { genres } = this.props;
      const genresList = genres.reduce(
        (acc, genre) => (
          ids.includes(genre.id) ? [...acc, genre.name] : acc), [],
      );
      return `${genresList.join(', ')}.`;
    }

    handleDescription = (e) => {
      const target = e.target.id;
      this.setState({ currentDescription: target });
    }

    renderOpenExpansion = () => {
      const { activeId } = this.props;
      const { currentDescription } = this.state;
      const activeTitle = activeId.title || activeId.original_name;
      const activeDate = activeId.release_date !== undefined
        ? activeId.release_date.slice(0, 4)
        : activeId.first_air_date.slice(0, 4);
      const activeOverview = activeId.overview.slice(0, 150);
      const activeGenre = activeId.genre_ids;

      return (
        <div className="expanded-layer">
          <div className="expanded-top">
            <div className="expanded-left">
              <div className="expanded-title">
                {activeTitle}
              </div>
              <div className="expanded-date">
                {activeDate}
              </div>
              <div className="expansion-overview">
                {activeOverview}
              </div>
              <div className="expansion-btns">
                <button type="button" className="expansion-btn-watch">
                  <Play />
                  watch
                </button>
                <button type="button" className="expansion-btn-mylist">
                  + My List
                </button>
                <div className="expansion-thumbs">
                  <ThumbUp />
                </div>
                <div className="expansion-thumbs">
                  <ThumbDown />
                </div>
              </div>
              <div className="expansion-genre">
                {`Genre: ${this.getGenre(activeGenre)}`}
              </div>
            </div>
            <div className="item-active-right">
              <button type="button" onClick={this.handleClose} className="close-item-active">
                x
              </button>
              <div />
            </div>
          </div>
          <div className="expanded-bottom">
            {descriptionList.map((desc) => (
              <button
                key={desc}
                id={`exp-${desc.replace(/ /g, '')}`}
                onClick={this.handleDescription}
                type="button"
                className={`expansion-bottom-${desc.replace(' ', '')}`}
                style={currentDescription === `exp-${desc.replace(/ /g, '')}` ? { borderBottom: '.5vw solid #e50914' } : {}}
              >
                {desc}
              </button>
            ))}
          </div>
        </div>
      );
    }

    render() {
      const {
        activeKey, title, image, activeId,
      } = this.props;
      const key = activeId.id + title.toLowerCase().replace(/ /g, '');

      return (
        <div
          className={`expanded-informations ${activeKey === key ? 'open' : 'close'}`}
          style={{
            backgroundSize: '65% 100%',
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${
              image
            })`,
          }}
        >
          {this.renderOpenExpansion()}
        </div>
      );
    }
}

Expansion.propTypes = {
  handleItemExpand: PropTypes.func.isRequired,
  activeKey: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  activeId: PropTypes.arrayOf().isRequired,
  genres: PropTypes.arrayOf().isRequired,
};

Expansion.defaultProps = {
  activeKey: '',
  title: '',
  image: '',
};

const mapStateToProps = (state) => ({
  errorGenres: getGenresError(state),
  genres: getGenres(state),
  pendingGenres: getGenresPending(state),
});

export default connect(mapStateToProps)(Expansion);
