import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { apiClient } from '../components/apiClient';


const SignUpPage = () => {
    useEffect(() => {
        document.title = "Регистрация";
        document.body.className = "init-" + localStorage.getItem("theme");
    }, []);

    const navigate = useNavigate();

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [errors, setErrors] = useState([]);
    

    let handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    let handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    let handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    let confirmSignUp = async (event) => {
        event.preventDefault();
        let inputErrors = [];

        if (!username || !password || !confirmPassword) {
            inputErrors.push("Необходимо заполнить каждое поле");
        }

        if (password !== confirmPassword) {
            inputErrors.push("Введённые пароли не совпадают");
        }

        if (!inputErrors.length) {
            try {
                await apiClient.registerUser({ username, password });
                navigate("/auth/sign-in", { state: { message: `Пользователь "${username}" зарегистрирован!` } });
            }
            
            catch (err) {
                if (err.code === "ERR_NETWORK") {
                    inputErrors.push("Ошибка получения данных с сервера");
                }

                else if (err.response?.status === 400) {
                    // Taking the absence of errors as empty array
                    let usernameErrors = err.response.data.username || [];
                    let passwordErrors = err.response.data.password || [];
                    
                    inputErrors = usernameErrors.concat(passwordErrors);
                }
            }
        }
        setErrors(inputErrors);
    };

    return (
        <>
            <div id="window" className='form-control auth-window'>
                <h2 style={{ textAlign: 'center', margin: '20px 0px' }}>Регистрация</h2>
                <form onSubmit={confirmSignUp}>
                    <input onChange={handleUsernameChange} placeholder="Придумайте уникальный логин" type="text" className="form-control auth-input" />
                    <input onChange={handlePasswordChange} placeholder="Создайте пароль" type="password" className="form-control auth-input" />
                    <input onChange={handleConfirmPasswordChange} placeholder="Подтвердите пароль" type="password" className="form-control auth-input" />

                    {errors &&
                        <ul style={{ color: 'red', fontFamily: 'sans-serif' }}>
                            {
                                errors.map((error, id) => (
                                    <li key={id}>
                                        {error}
                                    </li>
                                ))
                            }
                        </ul>
                    }

                    <button type="submit" className="btn btn-default" style={{
                        backgroundColor: 'var(--bs-blue)',
                        color: 'white',
                        marginBottom: '25px',
                    }}>Зарегистрироваться</button>
                </form>
                <span style={{ fontSize: '14px' }}>
                    Уже есть аккаунт? <Link to="/auth/sign-in">Выполните вход</Link>
                </span>
            </div>
        </>
    )
};


export default SignUpPage;
