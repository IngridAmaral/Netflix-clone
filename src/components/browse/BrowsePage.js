import React, { Fragment } from "react";
import axios from 'axios';
import HeaderBrowse from "./HeaderBrowse";
import "./BrowsePage.css";
import CoverContent from "./CoverContent";

const API_KEY = process.env.REACT_APP_API_KEY;
const ROOT_URL = "https://api.themoviedb.org/3";

class Browse extends React.Component {
  state = {
    movies: null,
  };

  componentDidMount = () => {
    if (!this.state.movies) {
      const getMovies = async () => {
        let resp = await axios.get(
          `${ROOT_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`
        );
        return await resp;
      };

      getMovies()
        .then(response => {
          // handle success
          this.setState({ movies: response.data.results });
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    }
  };

  render() {
    return (
      <div className="browse_container">
        <div className="browse_cover_container">
          {this.state.movies ? (
            <Fragment>
              <CoverContent movies={this.state.movies} />
              <HeaderBrowse />{" "}
            </Fragment>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Browse;
