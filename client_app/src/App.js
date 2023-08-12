import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Header from './components/Header';
import NotesList from './pages/NotesList';
import EditNote from './pages/EditNote';
import AddNote from './pages/AddNote';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { Route, Routes, Navigate } from 'react-router-dom';


const App = () => (
    <Routes>
        <Route path="/" element={<Header />}>
            <Route index element={<NotesList />} />
            <Route path="edit">
                <Route index element={<NotFound />} />
                <Route path=":id" element={<EditNote />} />
            </Route>
            <Route path="add" element={<AddNote />} />
            <Route path="auth">
                <Route index element={<Navigate to="sign-in" />} />
                <Route path="sign-in" element={<LoginPage />} />
                <Route path="sign-up" element={<SignUpPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
)


export default App;
