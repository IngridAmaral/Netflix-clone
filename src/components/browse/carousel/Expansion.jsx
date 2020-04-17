import React from 'react';
import PropTypes from 'prop-types';

import './Expansion.css';

class Expansion extends React.Component {
    state = {
      currentDescription: 'exp-overview',
    }

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
                  <svg id="thumb-up" viewBox="0 0 44 44">
                    <path fill="#fff" d="M14.4914731,10.5133658 C14.5025232,10.3721258 14.5112703,10.2600368 14.5373244,9.92616603 C14.6065316,9.03836208 14.6757357,8.14414039 14.7403047,7.30077512 C14.7465683,7.21894322 14.7465683,7.21894322 14.752828,7.13707632 C14.9046548,5.15090242 15.0272627,3.45867565 15.0272627,3.40867664 L15.0272627,1.53263123 L16.7144227,0.711648736 C16.9560747,0.594059357 17.2924682,0.45883302 17.7131667,0.333356234 C19.0883517,-0.0768040048 20.5613519,-0.154799924 22.0533288,0.363315376 C24.5195179,1.21974305 26.1769774,3.46135556 26.8035959,6.84975024 C27.351817,9.81421638 27.5019717,12.9866944 27.3599098,16.0115829 L34.1297665,16.0259652 L34.2527202,16.036358 C37.3831944,16.3009647 40,18.0263548 40,21.50351 C40,22.0672808 39.9265137,22.5421505 39.8025926,23.0579114 C40.5520589,23.9178872 41,25.0573442 41,26.5026539 C41,28.4265345 40.1989133,29.8141446 38.9529692,30.7147706 C39,31.0829242 39,31.2285855 39,31.5017978 C39,33.4256784 38.1989133,34.8132885 36.9529692,35.7139145 C37,36.1120923 37,36.2277294 37,36.5009417 C37,39.978097 34.3831944,41.703487 31.2527202,41.9680938 L31.1299097,41.9784745 L31.0066614,41.9787481 L21.4308667,42 C17.3598399,42 15.3049785,41.5120961 12.3004159,40.2094732 C10.4281403,39.3976996 9.56555009,39.1413507 7.75086356,38.9901527 L5,38.7609533 L5,22.2682088 L9.98007986,19.4037917 L14.4914731,10.5133658 Z M23.8535989,7.39510873 C22.6962315,1.13672751 18.0272627,3.40867664 18.0272627,3.40867664 C18.0272627,3.82250684 17.4358448,11.340371 17.4358448,11.340371 L12.2509485,21.558043 L8,24.003082 L8,36.0010273 C14,36.5009417 13.6061821,39.0005137 21.4308667,39.0005137 L31,38.9792692 C32.339044,38.866085 34,38.2712124 34,36.5009417 C34,34.730671 32.339044,34.1357984 31,34.0013698 L33,33.9801253 C34.339044,33.8669411 36,33.2720686 36,31.5017978 C36,29.7315271 34.339044,29.1366545 33,29.0022259 L35,28.9809814 C36.339044,28.8677972 38,28.2729247 38,26.5026539 C38,24.7323832 36.339044,24.1375106 35,24.003082 L34,23.9818375 C35.339044,23.8686533 37,23.2737808 37,21.50351 C37,19.7332393 35.339044,19.1383668 34,19.0251826 L24.0526449,19.0040499 C24.2446335,18.1909366 24.845597,12.7592672 23.8535989,7.39510873 Z" />
                  </svg>
                </div>
                <div className="expansion-thumbs">
                  <svg id="thumb-down" viewBox="0 0 44 44">
                    <path fill="currentColor" d="M29.5085269,33.4866342 C29.4974768,33.6278742 29.4887297,33.7399632 29.4626756,34.073834 C29.3934684,34.9616379 29.3242643,35.8558596 29.2596953,36.6992249 C29.2534317,36.7810568 29.2534317,36.7810568 29.247172,36.8629237 C29.0953452,38.8490976 28.9727373,40.5413244 28.9727373,40.5913234 L28.9727373,42.4673688 L27.2855773,43.2883513 C27.0439253,43.4059406 26.7075318,43.541167 26.2868333,43.6666438 C24.9116483,44.076804 23.4386481,44.1547999 21.9466712,43.6366846 C19.4804821,42.780257 17.8230226,40.5386444 17.1964041,37.1502498 C16.648183,34.1857836 16.4980283,31.0133056 16.6400902,27.9884171 L9.87023353,27.9740348 L9.74727981,27.963642 C6.61680565,27.6990353 4,25.9736452 4,22.49649 C4,21.9327192 4.07348633,21.4578495 4.19740742,20.9420886 C3.44794109,20.0821128 3,18.9426558 3,17.4973461 C3,15.5734655 3.80108673,14.1858554 5.04703083,13.2852294 C5,12.9170758 5,12.7714145 5,12.4982022 C5,10.5743216 5.80108673,9.18671152 7.04703083,8.28608555 C7,7.88790771 7,7.77227059 7,7.49905828 C7,4.02190301 9.61680565,2.29651296 12.7472798,2.03190622 L12.8700903,2.02152553 L12.9933386,2.0212519 L22.5691333,2 C26.6401601,2 28.6950215,2.48790389 31.6995841,3.79052685 C33.5718597,4.60230044 34.4344499,4.8586493 36.2491364,5.00984729 L39,5.23904667 L39,21.7317912 L34.0199201,24.5962083 L29.5085269,33.4866342 Z M20.1464011,36.6048913 C21.3037685,42.8632725 25.9727373,40.5913234 25.9727373,40.5913234 C25.9727373,40.1774932 26.5641552,32.659629 26.5641552,32.659629 L31.7490515,22.441957 L36,19.996918 L36,7.99897267 C30,7.49905828 30.3938179,4.99948634 22.5691333,4.99948634 L13,5.02073084 C11.660956,5.133915 10,5.72878756 10,7.49905828 C10,9.26932901 11.660956,9.86420157 13,9.99863023 L11,10.0198747 C9.66095598,10.1330589 8,10.7279314 8,12.4982022 C8,14.2684729 9.66095598,14.8633455 11,14.9977741 L9,15.0190186 C7.66095598,15.1322028 6,15.7270753 6,17.4973461 C6,19.2676168 7.66095598,19.8624894 9,19.996918 L10,20.0181625 C8.66095598,20.1313467 7,20.7262192 7,22.49649 C7,24.2667607 8.66095598,24.8616332 10,24.9748174 L19.9473551,24.9959501 C19.7553665,25.8090634 19.154403,31.2407328 20.1464011,36.6048913 Z" />
                  </svg>
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
  handleItemExpand: PropTypes.func.isRequired,
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
