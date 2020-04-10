import React from 'react';
import './Search.css';
import onClickOutside from 'react-onclickoutside';

class Search extends React.Component {
  state = {
    openSearch: false,
  };

  handleClickOutside = () => {
    this.setState({ openSearch: false });
  };

  handleClick = () => {
    this.setState((state) => ({ openSearch: !state.openSearch }));
  };

  render() {
    const layerStyleOn = {
      height: '100rem',
      width: '1000rem',
      background: '#g6d5s5',
      display: 'block',
    };

    return (
      <div
        className="search_browser_container"
        style={
          this.state.openSearch
            ? {
              border: '.05rem solid #fff',
              background: '#141414',
              width: '15rem',
            }
            : { width: '1.5rem' }
        }
      >
        <span className="search-icon" onClick={this.handleClick}>
          <i className="fas fa-search" />
        </span>
        <input
          style={
            this.state.openSearch
              ? { width: '15rem', opacity: '1' }
              : { width: '0', opacity: '0' }
          }
          type="text"
          placeholder="Titles, actors, genre"
        />
      </div>
    );
  }
}

export default onClickOutside(Search);
