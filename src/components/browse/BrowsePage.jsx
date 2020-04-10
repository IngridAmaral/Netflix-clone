import React from 'react';
import axios from 'axios';
import './BrowsePage.css';

import HeaderBrowse from './HeaderBrowse';
import CoverContent from './CoverContent';

const API_KEY = process.env.REACT_APP_API_KEY;
const ROOT_URL = 'https://api.themoviedb.org/3';

class Browse extends React.Component {
  state = {
    movies: null,
  };

  componentDidMount = () => {
    const { movies } = this.state;

    if (!movies) {
      const getMovies = async () => {
        const resp = await axios.get(
          `${ROOT_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`,
        );
        return resp;
      };

      getMovies()
        .then((response) => {
          // handle success
          this.setState({ movies: response.data.results });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    }
  };

  render() {
    const { movies } = this.state;

    return (
      <div className="browse_container">
        <div className="browse_cover_container">
          {movies ? (
            <>
              <CoverContent movies={movies} />
              <HeaderBrowse />
              {' '}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default Browse;
