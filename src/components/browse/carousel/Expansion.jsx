import React from 'react';
import PropTypes from 'prop-types';

import './Expansion.css';

class Expansion extends React.Component {
    handleClose = () => {
      const { handleExpand } = this.props;
      handleExpand(null, '');
    }

    render() {
      const {
        activeId, sectionName, title, image,
      } = this.props;

      return (
        <div
          className={`expanded-informations ${activeId ? 'open' : 'close'}`}
          style={{
            position: 'relative',
            zIndex: '-1',
            backgroundSize: '65% 100%',
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${
              image
            })`,
          }}
        >
          {activeId && title === sectionName && (
          <div className="expanded-layer">
            <div className="expanded-top">
              <div className="expanded-left">
                <div className="expanded-title">
                  {activeId.title || activeId.original_name}
                </div>
                <div className="expanded-date">
                  {activeId.release_date !== undefined ? activeId.release_date.slice(0, 4) : activeId.first_air_date.slice(0, 4)}
                </div>
                <div className="expanded-overview">
                  {activeId.overview.slice(0, 150)}
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
              bottom
            </div>
          </div>
          )}

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
