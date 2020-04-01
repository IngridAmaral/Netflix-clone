import React from 'react';
import HeaderBrowse from './HeaderBrowse';
import './BrowsePage.css';
import CoverContent from './CoverContent.js';

class Browse extends React.Component {
    render () {
        return (
            <div className='browse_container'>
                <HeaderBrowse />
                <CoverContent />  
            </div>
        )
    }
}

export default Browse;