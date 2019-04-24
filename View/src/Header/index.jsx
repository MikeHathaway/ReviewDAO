import React from 'react';
import logo from './logo.svg';
import style from './index.css'

export default function Header (props) {
    return (
        <header className={style.AppHeader}>
            {/* <img src={logo} className={style.AppLogo} alt="logo" /> */}
                <h1>
                    Review DAO
                </h1>
            <a
                className={style.AppLink}
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
            <p>
                Your balance: {props.mycurrency.token}
            </p>
            </a>
        </header>
    )
}