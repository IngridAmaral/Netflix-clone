import React from "react";
import { netflixLogo } from "../netflixLogo";
import "./HeaderBrowse.css";
import Search from './Search'

class HeaderBrowse extends React.Component {
  state = {
    bgColor: ""
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let state;
    if (window.pageYOffset > 1) {
      state = "#141414";
    } else {
      state = "";
    }
    console.log(window.pageYOffset);
    this.setState({ bgColor: state });
  };

  render() {
    console.log(this.state.bgColor);
    const menu = ["Start", "Series", "Movies", "Most Recent", "My list"];
    const styleHover = {
      cursor: "pointer"
    };

    const styleCurrent = {
      fontWeight: "bolder",
      opacity: "1"
    };

    return (
      <div
        className="header-container"
        style={{
          transition: "background-color 400ms",
          background: `${this.state.bgColor}`
        }}
      >
        <div className="header-content">
          <div className='header-left'>
            <img src={netflixLogo} alt="logo" />
            <div className="menu-items">
              {menu.map(id => (
                <span
                  className="menu-item"
                  style={id === "Start" ? styleCurrent : styleHover}
                >
                  {id}
                </span>
              ))}
            </div>
          </div>
          <Search />
        </div>
      </div>
    );
  }
}

export default HeaderBrowse;
