import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  findMovie, getGenres,
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

import './BrowsePage.css';

import HeaderBrowse from './HeaderBrowse';
import CoverContent from './CoverContent';
import SearchResults from './SearchResults';

class Browse extends React.Component {
  state = {
    genres: null,
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

    getGenres().then((response) => {
      // handle success
      this.setState({ genres: response.data.genres });
    })
      .catch((error) => {
        console.log(error);
      });


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
      genres,
      currentPage,
      headerBackgound,
    } = this.state;

    const { movies, series } = this.props;
    const allMovies = movies;
    const allSeries = series;
    console.log('movies:', movies, 'series:', series);
    return (
      <div className="browse_container">
        <div className="browse_cover_container">
          {allMovies.length > 1 && (
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
                    allMovies={allMovies}
                    allSeries={allSeries}
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
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMovies: fetchMoviesAC,
  fetchSeries: fetchSeriesAC,
}, dispatch);

export default connect(mapStateToProps,
  mapDispatchToProps)(Browse);
