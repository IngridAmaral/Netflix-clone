import React from 'react';
import onClickOutside from 'react-onclickoutside';
import './Search.css';

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

  handleClose = () => {
    const { handleSearch } = this.props;
    this.setState({ openSearch: false });
    handleSearch('789456123');
  }

  render() {
    const { openSearch } = this.state;
    const { handleInput, input } = this.props;
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
          value={input}
          onChange={handleInput}
          placeholder="Titles, actors, genre"
        />
        {input.length > 0
          ? (
            <button type="button" className="close-icon" onClick={this.handleClose}>
              <i className="fas fa-times" />
            </button>
          )
          : null}

      </div>
    );
  }
}

export default onClickOutside(Search);
