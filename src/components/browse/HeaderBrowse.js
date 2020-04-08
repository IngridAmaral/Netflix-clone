import React from "react";
import { netflixLogo } from "../netflixLogo";
import "./HeaderBrowse.css";
import Search from "./Search";
import DropdownMenu from './DropdownMenu'

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
    this.setState({ bgColor: state });
  };

  render() {
    const menu = ["Start", "Series", "Movies", "Most Recent", "My list"];
    const styleHover = {
      cursor: "pointer"
    };

    const styleCurrent = {
      fontWeight: "bolder",
      opacity: "1"
    };

    let user = {
      avatar:
        "https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png"
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
          <div className="header-left">
            <img src={netflixLogo} alt="logo" />
            <DropdownMenu items={menu} />
            <div className="menu-items">
              {menu.map(id => (
                <span key={id}
                  className="menu-item"
                  style={id === "Start" ? styleCurrent : styleHover}
                >
                  {id}
                </span>
              ))}
            </div>
          </div>
          <div className="header-rigth">
            <Search />
            <div className="header-rigth-items">
              <span>CHILD</span>
              
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.3em"
                  height="1.3em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="12" width="18" height="10" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M17,4c0,3.1-5,3-5,3s0-5,3-5C16.2,2,17,2.9,17,4z" />
                  <path d="M7,4c0,3.1,5,3,5,3s0-5-3-5C7.8,2,7,2.9,7,4z" />
                </svg>
              
              
                <svg
                  className="octicon octicon-bell"
                  viewBox="0 0 14 16"
                  version="1.1"
                  width="1.3em"
                  height="1.3em"
                  aria-hidden="true"
                  fill="#fff"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z"
                  ></path>
                </svg>
              
              <div className="header-avatar">
                <img src={user.avatar} alt="user avatar" />
                <span className="caret"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderBrowse;
