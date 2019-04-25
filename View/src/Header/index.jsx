import React from 'react';
import style from './index.css'

export default function Header (props) {
    return (
        <header className={style.AppHeader}>
            {/* <img src={logo} className={style.AppLogo} alt="logo" /> */}
                <h1>
                    Review DAO
                </h1>
            <p>
                Your balance: {props.mycurrency.token}
            </p>
        </header>
    )
}