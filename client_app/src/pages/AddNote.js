import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useCookies } from 'react-cookie';
import { apiClient } from '../components/apiClient';


const AddNote = () => {

    const navigate = useNavigate();

    let [cookies] = useCookies(["ca3utC7", "username"]);

    useEffect(() => {
        if (!cookies.username) {
            navigate("/auth/sign-in", { state: { message: "Для просмотра и создания новых заметок необходимо авторизоваться" } });
        }

        document.title = "Создать заметку";
        document.body.className = "init-" + localStorage.getItem("theme");
    }, [cookies, navigate]);

    let [head, setHead] = useState("");
    let [desc, setDesc] = useState("");
    let [error, setError] = useState("");

    let saveNote = async (event) => {
        event.preventDefault();
        
        try {
            await apiClient.createNote({ head, desc }, cookies.ca3utC7);
            navigate("/");
        }

        catch (err) {
            if (err.response.status === 400) {
                setError(
                    "Некорректный ввод. Максимально допустимое количество символов для полей заголовка и текста заметки - 50 и 500 символов соответственно. Пустые поля не разрешены."
                );
            }
        }
    };

    let handleHeadChange = (event) => {
        setHead(event.target.value);
    };

    let handleDescChange = (event) => {
        setDesc(event.target.value);
    };

    return (
        <>
            <h2 className='form-head'>
                Создание новой заметки.
            </h2>

            {error &&
                <div className='input-error'>
                    {error}
                </div>
            }

            <form onSubmit={saveNote}>
                <input onChange={handleHeadChange} className="form-control head-form" id="head" type="text" placeholder="Заголовок" style={{ width: '70%' }} />
                <textarea onChange={handleDescChange} className="form-control desc-form" id="desc" type="text" placeholder="Описание" rows="4" style={{ width: '70%' }} />
                <button type="submit" className="btn btn-success submit-btn">Добавить</button>
            </form>
        </>
    )
};


export default AddNote;