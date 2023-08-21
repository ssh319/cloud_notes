import React, { useEffect } from 'react';
import '../App.css';


const NotFound = () => {
    useEffect(() => {
        document.title = "Страница не найдена";
        document.body.classList.add("init");
    }, [])

    return (
        <main>
            <div style={{ fontFamily: 'monospace', color: 'var(--bs-blue)' }}>
                <div className='not-found-content' style={{ top: '45%', left: '38%' }}>
                    <strong style={{ fontSize: '2.8vw' }}>Страница не найдена.</strong><br />
                    <strong style={{ fontSize: '5vw' }}>404</strong>
                </div>
                <div className='not-found-content' style={{ top: '40%', left: '73%' }}>
                    <strong style={{ fontSize: '8vw' }}>;(</strong>
                </div>
            </div>
        </main>
    );
};


export default NotFound;
