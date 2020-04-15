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
                  {activeId.title}
                </div>
                <div className="expanded-date">
                  {activeId.release_date !== undefined ? activeId.release_date.slice(0, 4) : activeId.first_air_date.slice(0, 4)}
                </div>
                <div className="expanded-overview">
                  {activeId.overview.slice(0, 200)}
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
