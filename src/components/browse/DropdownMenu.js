import React from "react";
import './DropdownMenu.css';

class DropdownMenu extends React.Component {
  render() {
    return (
      <div className="dropdown">
        <button class="dropbtn">
          To browse<span class="caret"></span>
        </button>
        <div class="dropdown-content">
            {this.props.items.map(id => (
                <a href='#'
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
