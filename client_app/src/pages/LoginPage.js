import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useCookies } from 'react-cookie';
import { apiClient } from '../components/apiClient';


const LoginPage = () => {
    useEffect(() => {
        document.title = "Авторизация";
        document.body.className = "init-" + localStorage.getItem("theme");
    }, []);

    const navigate = useNavigate();
    const location = useLocation();

    const message = location.state ? location.state.message : null;

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [errors, setErrors] = useState([]);

    // Getting the cookie setter (2nd element) from array.
    let setCookie = useCookies(["ca3utC7", "username"])[1]

    let handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    let handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    let confirmAuthorization = async (event) => {
        event.preventDefault();

        let inputErrors = [];

        try {
            let [token, user] = await apiClient.authenticateUser({ username, password });
            setCookie("ca3utC7", token, { path: "/" });
            setCookie("username", user, { path: "/" });
            navigate("/");
        }
        
        catch (err) {
            if (err.code === "ERR_NETWORK") {
                inputErrors.push("Ошибка получения данных с сервера");
            }

            else if (err.response?.status === 400) {
                inputErrors.push("Введены некорректные или несуществующие данные");
            }
        }

        setErrors(inputErrors);
    }
    
    return (
        <main>
            <section id="window" className='form-control auth-window'>
                <h2 style={{ textAlign: 'center', margin: '20px 0px' }}>Авторизация</h2>

                {message &&
                    <div className="auth-window-message">
                        {message}
                    </div>
                }

                <form onSubmit={confirmAuthorization}>
                    <input onChange={handleUsernameChange} placeholder="Логин" type="text" className="form-control auth-input" required />
                    <input onChange={handlePasswordChange} placeholder="Пароль" type="password" className="form-control auth-input" required />

                    {errors &&
                        <ul style={{ color: 'red', fontFamily: 'sans-serif' }}>
                            {errors.map((error, id) => (
                                    <li key={id}>
                                        {error}
                                    </li>
                                ))
                            }
                        </ul>
                    }

                    <button type="submit" className="btn btn-primary" style={{ marginBottom: '25px' }}>Войти</button>
                </form>
                <span style={{ fontSize: '14px' }}>
                    Нет аккаунта? <Link to="/auth/sign-up">Пройдите регистрацию</Link>
                </span>
            </section>
        </main>
    )
}


export default LoginPage;
