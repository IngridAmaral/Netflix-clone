import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

import './BrowsePage.css';

import HeaderBrowse from './HeaderBrowse';
import CoverContent from './CoverContent';
import SearchResults from './SearchResults';

class Browse extends React.Component {
  state = {
    genresSt: null,
    redirectPath: 'browse',
    currentPage: 'Start',
    headerBackgound: '',
    input: '',
    resultSearch: null,
    activeId: null,
    sectionName: '',
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
      redirectPath, currentPage: id, headerBackgound, activeId: null, sectionName: '',
    });
  }

  handleSearchInput = (e) => {
    const target = e.target.value;
    this.setState({ input: target });

    if (target.length > 0) {
      this.handleSearch(target);
    } else {
      this.handleSearch('789456123');
    }
  }

  handleSearch = (text) => {
    if (text === '789456123') {
      this.setState({ resultSearch: null, input: '' });
    } else {
      findMovie(text)
        .then((response) => {
        // handle success
          this.setState({ resultSearch: response.data.results, input: text });
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
        // always executed
        });
    }
  }

  handleItemExpand = (movie, sectionName) => {
    this.setState({ activeId: movie, sectionName });
  }

  render() {
    const {
      input,
      resultSearch,
      activeId,
      sectionName,
      expand,
      currentPage,
      headerBackgound,
    } = this.state;

    const { movies, series, genres } = this.props;
    return (
      <div className="browse_container">
        <div className="browse_cover_container">
          {movies.length > 1 && (
            <div>
              { resultSearch
                ? <SearchResults result={resultSearch} />
                : (
                  <CoverContent
                    genres={genres}
                    expand={expand}
                    handleItemExpand={this.handleItemExpand}
                    sectionName={sectionName}
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

});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMovies: fetchMoviesAC,
  fetchSeries: fetchSeriesAC,
  fetchGenres: fetchGenresAC,
}, dispatch);

export default connect(mapStateToProps,
  mapDispatchToProps)(Browse);
