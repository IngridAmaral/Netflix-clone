import React from "react";
import './DropdownMenu.css';

class DropdownMenu extends React.Component {
  render() {
    return (
      <div className="dropdown">
        <button className="dropbtn">
          To browse<span className="caret"></span>
        </button>
        <span className="caret-up"></span>
        <div className="dropdown-content">
            {this.props.items.map(id => (
                <a key={id} href='#'
                  className="dropdown-item"
                >
                  {id}
                </a>
              ))}
        </div>
      </div>
    );
  }
}

export default DropdownMenu;
