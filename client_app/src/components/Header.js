import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import themePicture from "../assets/theme.png";


const Header = () => {
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }

    let [theme, setTheme] = useState(localStorage.getItem("theme"));

    // Cookie setter is skipped
    let [cookies, , removeCookie] = useCookies(["ca3utC7", "username"]);
    
    const navigate = useNavigate();

    let updateTimer = () => {
        const timer = document.getElementById("timer");
        let time = new Date(), h = time.getHours(), m = time.getMinutes(), s = time.getSeconds();
        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
        timer.innerHTML = ` ${h}:${m}:${s}`;
    };

    let toggleTheme = () => {
        setTheme(
            (theme === "init-light" || theme === "light") ? "dark" : "light"
        )
    };

    let logOut = () => {
        removeCookie("ca3utC7", { path: "/" });
        removeCookie("username", { path: "/" });
        navigate("/auth/sign-in");
    };

    useEffect(() => {
        updateTimer();
        setInterval(updateTimer, 1000);

        // Class with the 'init' prefix made as a separate CSS class to have no animation during page load.
        setTheme("init-" + localStorage.getItem("theme"));
    }, []);

    useEffect(() => {
        document.body.className = theme;
        
        // Slicing off the 'init' prefix if it is.
        localStorage.setItem("theme", theme.slice(0, 5) !== "init-" ? theme : theme.slice(5));
    }, [theme]);
    
    return (
        <>
            <header id="header" className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <p className="align-items-center mb-3 mb-md-0 me-md-auto" style={{ color: "var(--bs-blue)" }} >
                    <svg className="bi me-2" width="40" height="32" />
                    <span className="fs-4">Текущее время:
                        <span id="timer"> 00:00:00</span>
                    </span>
                </p>
                <ul className="nav nav-pills" style={{ marginRight: "10px" }}>
                    <NavLink className="nav-link" to="/">Мои заметки</NavLink>
                    <NavLink className="nav-link" to="/add">Создать заметку</NavLink>

                    {!cookies.username ?
                        <NavLink className="nav-link" to="auth">Вход/Регистрация</NavLink>
                        :
                        <>
                            <li className="desktop-username">Вы авторизованы как "{cookies.username}"</li>
                            <button style={{ padding: '8px 18px' }} className="btn btn-outline-danger" onClick={logOut}>Выйти</button>
                        </>
                    }

                    <button className="nav-link" onClick={toggleTheme} style={{ margin: '0px 10px' }}>
                        <img alt="Светлая/Тёмная тема" src={themePicture} />
                    </button>
                </ul>
            </header>

            {cookies.username &&
                <span className="mobile-username">Вы авторизованы как "{cookies.username}"</span>
            }

            <Outlet />
        </>
    );
};


export default Header;
