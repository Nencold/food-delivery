import './Header.css';
import React from 'react';
import Slider from './Slider/Slider';

function Header(){
    const f1 = e => {
        e.preventDefault();
    }

    return(
        <div className="Header">
            <div className="container">
                <div className="header-logo">
                    <a href="#" onClick={f1}><img src="images/headerlogo.svg" alt="logo" /></a>
                </div>
                <div className="header-body">
                    <Slider/>
                </div>
            </div>
        </div>
    );
}

export default Header;