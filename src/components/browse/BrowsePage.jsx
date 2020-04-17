import React from 'react';
import {
  getMovies, findMovie, getGenres,
} from '../../Api';

import './BrowsePage.css';

import HeaderBrowse from './HeaderBrowse';
import CoverContent from './CoverContent';
import SearchResults from './SearchResults';

class Browse extends React.Component {
  state = {
    movies: null,
    redirectPath: 'browse',
    currentPage: 'Start',
    input: '',
    resultSearch: null,
    activeId: null,
    sectionName: '',
    genres: null,
  };

  componentDidMount = () => {
    const { movies, redirectPath, currentPage } = this.state;

    if (!movies) {
      getMovies(redirectPath)
        .then((response) => {
          // handle success
          this.setState({ movies: response.data.results });
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          // always executed
        });
      getGenres().then((response) => {
        // handle success
        this.setState({ genres: response.data.genres });
      })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    }
  };

  handlePageChange = (id) => {
    const redirectPath = id === 'Start' ? 'browse' : id.toLowerCase().replace(' ', '');
    this.setState({ redirectPath, currentPage: id });
    this.handleGetMovies(id, redirectPath);
  }

  handleGetMovies = (type) => {
    getMovies(type)
      .then((response) => {
        // handle success
        console.log(response.data.results);
        this.setState({ movies: response.data.results });
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  handleInput = (e) => {
    const target = e.target.value;
    this.setState({ input: target });

    if (target.length > 0) {
      this.handleSearch(target);
    } else {
      this.handleSearch('789456123');
    }
  }

  handleExpand = (movie, sectionName) => {
    if (!movie) {
      this.setState({ activeId: movie, sectionName });
    } else {
      this.setState({ activeId: movie, sectionName });
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

  render() {
    const {
      input, resultSearch, movies, activeId, sectionName, expand, genres,
    } = this.state;
    return (
      <div className="browse_container">
        <div className="browse_cover_container">
          {movies && (
            <div>
              { resultSearch
                ? <SearchResults result={resultSearch} />
                : <CoverContent genres={genres} expand={expand} handleExpand={this.handleExpand} sectionName={sectionName} activeId={activeId} movies={movies} />}
              <HeaderBrowse
                onClick={this.handlePageChange}
                handleSearch={this.handleSearch}
                handleInput={this.handleInput}
                input={input}
              />
              {' '}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Browse;
