import React from 'react';
import PropTypes from 'prop-types';

import './Expansion.css';

class Expansion extends React.Component {
    state = {
      currentDescription: 'exp-overview',
    }

    handleClose = () => {
      const { handleExpand } = this.props;
      handleExpand(null, '');
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
      const descriptionList = ['overview', 'more like this', 'details'];
      const activeTitle = activeId ? activeId.title || activeId.original_name : ' ';
      const activeDate = activeId ? activeId.release_date !== undefined ? activeId.release_date.slice(0, 4) : activeId.first_air_date.slice(0, 4) : ' ';
      const activeOverview = activeId ? activeId.overview.slice(0, 150) : ' ';
      const activeGenre = activeId ? activeId.genre_ids : ' ';

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
                  <svg id="expansion-play-icon" viewBox="0 0 28 28">
                    <polygon fill="#fff" className="arrow" points="10 20 10 8 20 14" />
                  </svg>
                  watch
                </button>
                <button type="button" className="expansion-btn-mylist">
                  + My List
                </button>
                <div className="expansion-thumbs">
                  <i className="far fa-thumbs-up" />
                </div>
                <div className="expansion-thumbs">
                  <i className="far fa-thumbs-down" />
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
        sectionName, title, image,
      } = this.props;
      return (
        <div
          className={`expanded-informations ${sectionName === title ? 'open' : 'close'}`}
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
  handleExpand: PropTypes.func.isRequired,
  sectionName: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
};

Expansion.defaultProps = {
  sectionName: '',
  title: '',
  image: '',
};

export default Expansion;
