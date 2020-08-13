import React from "react";
import { connect, batch } from "react-redux";
import { bindActionCreators } from "redux";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";
import PropTypes from "prop-types";
import {
  getMoviesPending,
  getMovies,
  getMoviesError,
} from "./redux/reducers/movies";
import {
  getSeriesPending,
  getSeries,
  getSeriesError,
} from "./redux/reducers/series";
import {
  getResultsPending,
  getResults,
  getResultsError,
} from "./redux/reducers/search";
import { fetchMoviesAC } from "./redux/actions/movies";
import { fetchSeriesAC } from "./redux/actions/series";
import { fetchGenresAC } from "./redux/actions/genres";
import { fetchResultsAC } from "./redux/actions/search";

import "./BrowsePage.css";

import BrowseHeader from "./BrowseHeader";
import CoverContent from "./CoverContent";
import SearchResults from "./SearchResults";

const START = "Start";
const HEADER_BG_COLOR = "#141414";

class Browse extends React.Component {
  state = {
    currentPage: START,
    headerBackgound: "",
    input: "",
    activeId: null,
    activeKey: "",
    resultChunks: [],
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.howManySlidesInARow();
    window.addEventListener("resize", this.howManySlidesInARow);

    const { fetchGenres, fetchMovies, fetchSeries } = this.props;
    batch(() => {
      fetchGenres();
      fetchMovies();
      fetchSeries();
    });
  }

  componentDidUpdate(prevProps) {
    const { results } = this.props;

    if (results !== prevProps.results) {
      this.howManySlidesInARow();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.howManySlidesInARow);
  }

  // SEARCH
  handleSearchInput = (e) => {
    const { value } = e.target;
    this.setState({ input: value });

    if (value.length > 0) {
      this.handleSearch(value);
    } else {
      this.handleSearch();
    }
  };

  handleSearch = (text) => {
    if (text === undefined) {
      this.setState({ input: "" });
    } else {
      this.howManySlidesInARow();
      this.getSearchResult(text);
    }
  };

  getSearchResult = debounce((text) => {
    const { fetchResults } = this.props;
    fetchResults(text);
  }, 1000);

  howManySlidesInARow = throttle(() => {
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
      this.calculateChunks(slice);
    }
  }, 800);

  calculateChunks = (slice) => {
    const { results } = this.props;
    const { resultChunks } = this.state;
    const result = [];
    if (resultChunks.length === 0 || resultChunks[0].length !== slice) {
      results.forEach((x, y, z) =>
        !(y % slice) ? result.push(z.slice(y, y + slice)) : ""
      );
      this.setState({ resultChunks: result });
    }
  };

  // EXPANDED
  handleItemExpand = (movie, activeKey, section) => {
    this.setState({ activeId: movie, activeKey, section });
  };

  // HEADER
  handleHeaderPageChange = (id) => {
    // const redirectPath = id === START ? 'browse' : id.toLowerCase().replace(' ', '');
    const headerBackgound = id === START ? "" : HEADER_BG_COLOR;
    this.setState({
      currentPage: id,
      headerBackgound,
      activeId: null,
      activeKey: "",
    });
  };

  handleScroll = () => {
    const { currentPage, headerBackgound } = this.state;
    let color;
    if (
      (window.pageYOffset > 1 && headerBackgound !== HEADER_BG_COLOR) ||
      currentPage !== START
    ) {
      color = HEADER_BG_COLOR;
      this.setState({ headerBackgound: color });
    } else if (window.pageYOffset === 0) {
      color = "";
      this.setState({ headerBackgound: color });
    }
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
          {movies.length > 0 ? (
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
              <BrowseHeader
                onClick={this.handleHeaderPageChange}
                handleSearch={this.handleSearch}
                handleInput={this.handleSearchInput}
                input={input}
                currentPage={currentPage}
                background={headerBackgound}
              />{" "}
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#141414",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              {""}
              <i className="fas fa-spinner fa-5x fa-spin"></i>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Browse.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  series: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchGenres: PropTypes.func.isRequired,
  fetchMovies: PropTypes.func.isRequired,
  fetchSeries: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
};

Browse.defaultProps = {
  results: [],
};

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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchMovies: fetchMoviesAC,
      fetchSeries: fetchSeriesAC,
      fetchGenres: fetchGenresAC,
      fetchResults: fetchResultsAC,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
