import React from 'react';
import './ItemItemsCard.css';

class ItemItemsCard extends React.Component {
    render() {
        const {icon, size, onClick} = this.props;
        return (
            <span onClick={onClick} className={`icon-card ${size}`}>
                <i className={icon}></i>
            </span>
        )
    }
}

export default ItemItemsCard