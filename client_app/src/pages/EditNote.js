import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Link,
    useNavigate,
    useParams   
} from 'react-router-dom';
import '../App.css';
import { useCookies } from 'react-cookie';
import { apiClient } from '../components/apiClient';


const EditNote = () => {
    const navigate = useNavigate();
    const params = useParams();

    let [note, setNote] = useState(null);
    let [error, setError] = useState("");
    let [head, setHead] = useState("");
    let [desc, setDesc] = useState("");
    let [cookies] = useCookies(["ca3utC7", "username"]);

    useEffect(() => {
        document.title = "Редактирование заметки";
        document.body.classList.add("init");
        let getNote = async () => {
            try {
                let data = await apiClient.getNoteForEdit(params.id, cookies.ca3utC7);
                setNote(data);
            }

            catch (err) {
                let message = "";
                if (err.response.status === 401) {
                    message = "Для просмотра и создания новых заметок необходимо авторизоваться"
                }
                else if (err.response.status === 500) {
                    message = "Возникла ошибка сервера при получении данных для заметки с запрошенным ID"
                }
                navigate("/auth/sign-in", { state: { message } })
            }
        }

        getNote();

    }, [params, cookies, navigate])

    useEffect(() => {
        const headField = document.getElementById('head'), descField = document.getElementById('desc');
        if (note) {
            headField.value = note.head;
            descField.innerHTML = note.desc;
            setHead(note.head);
            setDesc(note.desc);
        }
    }, [note])
    

    let saveNote = async (event, id) => {
        event.preventDefault();

        try {
            await apiClient.saveChangedNote({ head, desc }, id, cookies.ca3utC7);
            navigate("/");
        }
        
        catch (err) {
            if (err.response.status === 400) {
                setError(
                    "Некорректный ввод. Максимально допустимое количество символов для полей заголовка и текста заметки - 50 и 500 символов соответственно."
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
        <main>
            <h2 className='form-head'>
                Редактирование заметки "{note?.head}"
            </h2>

            {error &&
                <div className='input-error'>
                    {error}
                </div>
            }

            <form onSubmit={(event) => saveNote(event, note.id)}>
                <input onChange={handleHeadChange} className="form-control head-form" id="head" type="text" placeholder="Заголовок" style={{ width: '70%' }} required />
                <textarea onChange={handleDescChange} rows="4" className="form-control desc-form" id="desc" type="text" placeholder="Описание" style={{ width: '70%' }} required />
                <button type="submit" className="btn btn-primary submit-btn">Сохранить</button>
                <Link to="/" className="btn btn-secondary submit-btn" style={{ left: '15.5%', padding: '6px 20px' }}>Отмена</Link>
            </form>
        </main>
    );
};


export default EditNote;
