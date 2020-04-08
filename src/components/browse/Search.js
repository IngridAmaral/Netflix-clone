import React from "react";
import "./Search.css";
import onClickOutside from "react-onclickoutside";

class Search extends React.Component {
  state = {
    openSearch: false
  };

  handleClickOutside = () => {
    this.setState({ openSearch: false });
  };

  handleClick = () => {
    this.setState(state => ({ openSearch: !state.openSearch }));
  };

  render() {
    const layerStyleOn = {
      height: "100rem",
      width: "1000rem",
      background: "#g6d5s5",
      display: "block"
    };

    return (
      <div
        className="search_browser_container"
        style={
          this.state.openSearch
            ? {
                border: ".05rem solid #fff",
                background: "#141414",
                width: "15rem"
              }
            : { width: "1.5rem" }
        }
      >
        <svg
          onClick={this.handleClick}
          className="svg-icon"
          viewBox="0 0 20 20"
        >
          <path
            fill="none"
            d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
								c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
								c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461
								s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z"
          ></path>
        </svg>
        <input
          style={
            this.state.openSearch
              ? { width: "15rem", opacity: "1" }
              : { width: "0", opacity: "0" }
          }
          type="text"
          placeholder="Titles, actors, genre"
        />
      </div>
    );
  }
}

export default onClickOutside(Search);
