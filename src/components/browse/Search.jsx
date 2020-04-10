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
    const { openSearch } = this.state;
    return (
      <div
        className="search_browser_container"
        style={
          openSearch
            ? {
              border: '.05rem solid #fff',
              background: '#141414',
              width: '15rem',
            }
            : { width: '1.5rem' }
        }
      >
        <button type="button" className="search-icon" onClick={this.handleClick}>
          <i className="fas fa-search" />
        </button>
        <input
          style={
            openSearch
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
