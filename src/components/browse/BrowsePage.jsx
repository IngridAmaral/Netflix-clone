import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash.debounce';

import { fetchMoviesAC } from './redux/actions/movies';

import {
  getMoviesPending,
  getMovies,
  getMoviesError,
} from './redux/reducers/movies';

import { fetchSeriesAC } from './redux/actions/series';

import {
  getSeriesPending,
  getSeries,
  getSeriesError,
} from './redux/reducers/series';

import { fetchGenresAC } from './redux/actions/genres';

import {
  getGenresPending,
  getGenres,
  getGenresError,
} from './redux/reducers/genres';

import { fetchResultsAC } from './redux/actions/search';

import {
  getResultsPending,
  getResults,
  getResultsError,
} from './redux/reducers/search';

import './BrowsePage.css';

import HeaderBrowse from './HeaderBrowse';
import CoverContent from './CoverContent';
import SearchResults from './SearchResults';

class Browse extends React.Component {
  state = {
    redirectPath: 'browse',
    currentPage: 'Start',
    headerBackgound: '',
    input: '',
    activeId: null,
    activeKey: '',
    resultChunks: [],
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleHeaderScroll);
    window.addEventListener('resize', this.howManySlidesInARow);
    const { fetchGenres } = this.props;
    fetchGenres();
    const { fetchMovies } = this.props;
    fetchMovies();
    const { fetchSeries } = this.props;
    fetchSeries();
  }

  componentDidUpdate(prevProps) {
    const { results } = this.props;

    if (results !== prevProps.results) {
      this.howManySlidesInARow();
    }
  }

  handleHeaderPageChange = (id) => {
    const redirectPath = id === 'Start' ? 'browse' : id.toLowerCase().replace(' ', '');
    const headerBackgound = id === 'Start' ? '' : '#141414';
    this.setState({
      redirectPath,
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
      expand,
      currentPage,
      headerBackgound,
      section,
      resultChunks,
    } = this.state;

    const {
      movies, series, genres, results,
    } = this.props;
    return (
      <div className="browse_container">
        <div className="browse_cover_container">
          {movies.length > 0 && (
            <div>
              {input.length > 0 && resultChunks.length > 0 ? (
                <SearchResults
                  result={results}
                  genres={genres}
                  expand={expand}
                  handleItemExpand={this.handleItemExpand}
                  activeKey={activeKey}
                  activeId={activeId}
                  section={section}
                  results={results}
                  howManySlidesInARow={this.howManySlidesInARow}
                  resultChunks={resultChunks}
                  currentPage={currentPage}
                />
              ) : (
                <CoverContent
                  genres={genres}
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
  errorGenres: getGenresError(state),
  genres: getGenres(state),
  pendingGenres: getGenresPending(state),
  errorResults: getResultsError(state),
  results: getResults(state),
  pendingResults: getResultsPending(state),
});

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
