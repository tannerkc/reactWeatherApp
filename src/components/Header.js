import React from 'react';
import moment from 'moment';
import './Header.css'

function Header() {
    return (
        <div className="header">
            {moment().format("dddd, MMMM D")}
        </div>
    )
}

export default Header;
