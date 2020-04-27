import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash.debounce';
import {
  findMovie,
} from '../../Api';

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
    resultSearch: null,
    activeId: null,
    activeKey: '',
  };

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleHeaderScroll);

    const { fetchGenres } = this.props;
    fetchGenres();
    const { fetchMovies } = this.props;
    fetchMovies();
    const { fetchSeries } = this.props;
    fetchSeries();
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

  handleHeaderPageChange = (id) => {
    const redirectPath = id === 'Start' ? 'browse' : id.toLowerCase().replace(' ', '');
    const headerBackgound = id === 'Start' ? '' : '#141414';
    this.setState({
      redirectPath, currentPage: id, headerBackgound, activeId: null, activeKey: '',
    });
  }

  handleSearchInput = (e) => {
    const { value } = e.target;
    this.setState({ input: value });
    console.log('input', value.length, value);

    if (value.length > 0) {
      this.handleSearch(value);
    } else {
      console.log('empty');
      this.handleSearch('789456123');
    }
  }

  handleSearch = (text) => {
    if (text === '789456123') {
      console.log('empty reset');
      this.setState({ resultSearch: null, input: '' });
    } else {
      this.getSearchResult(text);
    }
  }

  getSearchResult = debounce((text) => {
    const { fetchResults } = this.props;
    fetchResults(text);

    findMovie(text)
      .then((response) => {
        // handle success
        console.log(response);
        this.setState({ resultSearch: response.data.results });
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }, 1000)

  handleItemExpand = (movie, activeKey) => {
    this.setState({ activeId: movie, activeKey });
  }

  splitResults = () => {
    const { results } = this.props;

    const result = [];

    results.forEach((x, y, z) => (!(y % 5) ? result.push(z.slice(y, y + 5)) : ''));

    return result;
  }

  render() {
    const {
      input,
      resultSearch,
      activeId,
      activeKey,
      expand,
      currentPage,
      headerBackgound,
    } = this.state;

    const {
      movies, series, genres, results,
    } = this.props;
    return (
      <div className="browse_container">
        <div className="browse_cover_container">
          {movies.length > 1 && (
            <div>
              { resultSearch
                ? (
                  <SearchResults
                    result={results}
                    genres={genres}
                    expand={expand}
                    handleItemExpand={this.handleItemExpand}
                    activeKey={activeKey}
                    activeId={activeId}
                    currentPage={currentPage}
                  />
                )
                : (
                  <CoverContent
                    genres={genres}
                    expand={expand}
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMovies: fetchMoviesAC,
  fetchSeries: fetchSeriesAC,
  fetchGenres: fetchGenresAC,
  fetchResults: fetchResultsAC,
}, dispatch);

export default connect(mapStateToProps,
  mapDispatchToProps)(Browse);
