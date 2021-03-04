import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="">
                <div className="navbar-brand">{this.props.header}</div>
            </div>
        )
    }
}

export default Header;
