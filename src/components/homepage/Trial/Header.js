import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className='trial_header_container'>
                <img className='trial_header_logo' src='https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png' alt='Netflix Logo' />
                <button className='trial_header_signin_btn'>Sign in</button>
            </div>
        )
    }
}

export default Header;