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
    const { movies, redirectPath } = this.state;

    window.addEventListener('scroll', this.handleHeaderScroll);

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
    this.handleGetMovies(redirectPath);
  }

  handleGetMovies = (type) => {
    getMovies(type)
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
    if (!movie) {
      this.setState({ activeId: movie, sectionName });
    } else {
      this.setState({ activeId: movie, sectionName });
    }
  }

  render() {
    const {
      input,
      resultSearch,
      movies,
      activeId,
      sectionName,
      expand,
      genres,
      currentPage,
      headerBackgound,
    } = this.state;
    return (
      <div className="browse_container">
        <div className="browse_cover_container">
          {movies && (
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

export default Browse;
