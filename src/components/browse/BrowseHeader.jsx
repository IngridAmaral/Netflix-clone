import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './BrowseHeader.css';

import { NETFLIX_LOGO } from '../../constants';
import Search from './Search';
import DropdownMenu from './DropdownMenu';
import { ReactComponent as Gift } from '../../assets/images/gift.svg';
import { ReactComponent as Bell } from '../../assets/images/bell.svg';


const styleHover = {
  cursor: 'pointer',
};

const styleCurrent = {
  fontWeight: 'bolder',
  opacity: '1',
};

const user = {
  avatar:
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png',
};

const menu = ['Start', 'Series', 'Movies', 'Most Recent', 'My list'];

const renderItems = (currentPage, onClick) => menu.map((id) => (
  <Link key={id} to={id === 'Start' ? 'browse' : id.toLowerCase().replace(' ', '')}>
    <button
      type="button"
      className="menu-item"
      onClick={() => onClick(id)}
      style={currentPage === id ? styleCurrent : styleHover}
    >
      {id}
    </button>
  </Link>
));

const BrowseHeader = ({
  onClick, handleSearch, handleInput, input, currentPage, background,
}) => (
  <div
    className="header-container"
    style={{
      transition: 'background-color 800ms',
      background: `${background}`,
    }}
  >
    <div className="header-content">
      <div className="header-left">
        <img src={NETFLIX_LOGO} alt="logo" />
        <DropdownMenu renderItems={renderItems} currentPage={currentPage} onClick={onClick} />
        <div className="menu-items">
          {renderItems(currentPage, onClick)}
        </div>
      </div>
      <div className="header-rigth">
        <Search input={input} handleSearch={handleSearch} handleInput={handleInput} />
        <div className="header-rigth-items">
          <span>CHILD</span>
          <Gift />
          <Bell />
          <div className="header-avatar">
            <img src={user.avatar} alt="user avatar" />
            <span className="caret" />
          </div>
        </div>
      </div>
    </div>
  </div>
);


BrowseHeader.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  input: PropTypes.string,
  currentPage: PropTypes.string.isRequired,
  background: PropTypes.string,
};

BrowseHeader.defaultProps = {
  input: '',
  background: '',
};

export default BrowseHeader;
