import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../components/apiClient';


const NotesList = () => {
    let [notes, setNotes] = useState([]);
    let [filteredNotes, setFilteredNotes] = useState(notes);
    let [search, setSearch] = useState("");
    let [error, setError] = useState("");
    let [cookies] = useCookies(["token", "username"]);
    const navigate = useNavigate();

    let getNotes = useCallback( async () => {
        try {
            let data = await apiClient.getNotes(cookies.token);
            setNotes(data);
        }
        
        catch (err) {
            if (err.code === "ERR_NETWORK") {
                setError("Ошибка получения данных с сервера")
            }

            else if (err.response?.status === 401) {
                navigate("/auth/sign-in", { state: { message: "Для просмотра и создания новых заметок необходимо авторизоваться" } })
            }
        }
    }, [navigate, cookies]);

    useEffect(() => {
        document.title = "Мои заметки";
        document.body.classList.add("init");
        getNotes();
    }, [getNotes]);

    useEffect(() => {
        let isSearchMatching = (note) => (
            note.head.toLowerCase().includes(search) || note.desc.toLowerCase().includes(search)
        );

        let data = notes.filter(isSearchMatching);
        setFilteredNotes(data);
    }, [search, notes]);

    
    let searchNotes = (event) => {
        setSearch(event.target.value.toLowerCase());
    };

    let deleteNote = async (note) => {
        if (window.confirm(`Вы уверены, что хотите удалить заметку "${note.head}"?`)) {
            await apiClient.deleteNote(note.id, cookies.token);
            getNotes();
        };
    };

    
    return (
        <main>
            <input className="form-control search-input" onChange={searchNotes} type="text" placeholder="Поиск по заметкам" />
            
            {error &&
                <h1 style={{ color: 'var(--bs-red)', textAlign: 'center', marginTop: '50px' }}>
                    {error}
                </h1>
            }

            {filteredNotes.map((note) => (
                <section key={note.id} className="alert note" style={{ border: '1px solid var(--bs-blue)', fontSize: '17px' }}>
                    <span id="note_date" className='last-edit-date'>
                        Последнее редактирование: <time dateTime={note.timestamp}> {new Date(note.timestamp).toLocaleString()} </time>
                    </span>

                    <article style={{ wordWrap: 'break-word' }} >
                        <h5>• {note.head}</h5>
                        <p>{note.desc}</p>
                    </article>

                    <Link to={`edit/${note.id}`} className="btn btn-primary note-btn" style={{ padding: '2px 22px' }}>Редактировать запись</Link>
                    <button onClick={() => deleteNote(note)} className="btn btn-danger note-btn" style={{ padding: '2px 48px', left: '5px' }}>Удалить запись</button>

                </section>
            ))}
        </main>
    );
};


export default NotesList;
