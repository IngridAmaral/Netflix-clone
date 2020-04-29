import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

import { getMoviesPending, getMovies, getMoviesError } from './redux/reducers/movies';
import { getSeriesPending, getSeries, getSeriesError } from './redux/reducers/series';
import { getResultsPending, getResults, getResultsError } from './redux/reducers/search';
import { fetchMoviesAC } from './redux/actions/movies';
import { fetchSeriesAC } from './redux/actions/series';
import { fetchGenresAC } from './redux/actions/genres';
import { fetchResultsAC } from './redux/actions/search';

import './BrowsePage.css';

import HeaderBrowse from './HeaderBrowse';
import CoverContent from './CoverContent';
import SearchResults from './SearchResults';

class Browse extends React.Component {
  state = {
    currentPage: 'Start',
    headerBackgound: '',
    input: '',
    activeId: null,
    activeKey: '',
    resultChunks: [],
  };

  componentDidMount() {
    const { input } = this.state;
    window.addEventListener('scroll', this.handleHeaderScroll);
    if (input.length > 0) {
      window.addEventListener('resize', this.howManySlidesInARow);
    }
    const { fetchGenres, fetchMovies, fetchSeries } = this.props;
    fetchGenres();
    fetchMovies();
    fetchSeries();
  }

  componentDidUpdate(prevProps) {
    const { results } = this.props;

    if (results !== prevProps.results) {
      this.howManySlidesInARow();
    }
  }

  handleHeaderPageChange = (id) => {
    // const redirectPath = id === 'Start' ? 'browse' : id.toLowerCase().replace(' ', '');
    const headerBackgound = id === 'Start' ? '' : '#141414';
    this.setState({
      currentPage: id,
      headerBackgound,
      activeId: null,
      activeKey: '',
    });
  };

  handleHeaderScroll = () => {
    const { currentPage } = this.state;
    let state;
    if (window.pageYOffset > 1 || currentPage !== 'Start') {
      state = '#141414';
    } else {
      state = '';
    }
    this.setState({ headerBackgound: state });
  };

  // SEARCH
  handleSearchInput = (e) => {
    const { value } = e.target;
    this.setState({ input: value });

    if (value.length > 0) {
      this.handleSearch(value);
      this.howManySlidesInARow();
    } else {
      this.handleSearch('789456123');
    }
  };

  handleSearch = (text) => {
    if (text === '789456123') {
      this.setState({ input: '' });
    } else {
      this.howManySlidesInARow();
      this.getSearchResult(text);
    }
  };

  getSearchResult = debounce((text) => {
    const { fetchResults } = this.props;
    fetchResults(text);
  }, 1000);

  howManySlidesInARow = () => {
    const { results } = this.props;
    const screenWidth = window.innerWidth;

    let slice;

    switch (true) {
      case screenWidth > 3000:
        slice = 6;
        break;
      case screenWidth > 1060:
        slice = 5;
        break;
      case screenWidth > 800:
        slice = 4;
        break;
      case screenWidth > 500:
        slice = 3;
        break;
      case screenWidth > 360:
        slice = 2;
        break;
      default:
        slice = 5;
    }

    if (results.length > 0) {
      const resultChunks = [];
      results.forEach((x, y, z) => (!(y % slice) ? resultChunks.push(z.slice(y, y + slice)) : ''));
      this.setState({ resultChunks });
    }
  };

  // EXPANDED
  handleItemExpand = (movie, activeKey, section) => {
    this.setState({ activeId: movie, activeKey, section });
  };

  render() {
    const {
      input,
      activeId,
      activeKey,
      currentPage,
      headerBackgound,
      section,
      resultChunks,
    } = this.state;

    const { movies, series } = this.props;

    return (
      <div className="browse_container">
        <div className="browse_cover_container">
          {movies.length > 0 && (
            <div>
              {input.length > 0 && resultChunks.length > 0 ? (
                <SearchResults
                  handleItemExpand={this.handleItemExpand}
                  activeKey={activeKey}
                  activeId={activeId}
                  section={section}
                  resultChunks={resultChunks}
                />
              ) : (
                <CoverContent
                  section={section}
                  handleItemExpand={this.handleItemExpand}
                  activeKey={activeKey}
                  activeId={activeId}
                  movies={movies}
                  series={series}
                  currentPage={currentPage}
                />
              )}
              <HeaderBrowse
                onClick={this.handleHeaderPageChange}
                handleSearch={this.handleSearch}
                handleInput={this.handleSearchInput}
                input={input}
                currentPage={currentPage}
                background={headerBackgound}
              />
              {' '}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getMoviesError(state),
  movies: getMovies(state),
  pending: getMoviesPending(state),
  errorSeries: getSeriesError(state),
  series: getSeries(state),
  pendingSeries: getSeriesPending(state),
  errorResults: getResultsError(state),
  results: getResults(state),
  pendingResults: getResultsPending(state),
});

Browse.propTypes = {
  results: PropTypes.arrayOf().isRequired,
  movies: PropTypes.arrayOf().isRequired,
  series: PropTypes.arrayOf().isRequired,
  fetchGenres: PropTypes.func.isRequired,
  fetchMovies: PropTypes.func.isRequired,
  fetchSeries: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,

};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    fetchMovies: fetchMoviesAC,
    fetchSeries: fetchSeriesAC,
    fetchGenres: fetchGenresAC,
    fetchResults: fetchResultsAC,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
