import React from 'react';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends React.Component {
  state = {
    openSearch: false,
  };

  handleClickOutside = () => {
    const { handleSearch, input } = this.props;

    if (input.length === 0) {
      this.setState({ openSearch: false });
      handleSearch();
    }
  };

  handleClick = () => {
    this.setState((state) => ({ openSearch: !state.openSearch }));
    return this.myInp.focus();
  };

  handleClose = () => {
    const { handleSearch } = this.props;
    this.setState({ openSearch: false });
    handleSearch();
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
          ref={(ip) => this.myInp = ip}
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

Search.propTypes = {
  handleInput: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  input: PropTypes.string,
};

Search.defaultProps = {
  input: '',
};

export default onClickOutside(Search);
