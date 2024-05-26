import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import StudyRoom from './StudyRoom';
import ClubRoom from './ClubRoom';
import Grill from './Grill';
import Logout from "./Logout";

function RedirectToExternal({ url }) {
    useEffect(() => {
        window.location.href = url;
    }, [url]);

    return null; // Since we are redirecting, there's no need to render anything
}


function Login({ onLogin }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const userNameParam = params.get('username');
        if (userNameParam) {
            onLogin(userNameParam);
            navigate('/'); // Redirect to home page or any other route after login
        }
    }, [location, onLogin, navigate]);

    return null;
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const location = useLocation();

    const handleLogin = useCallback((userName) => {
        setIsLoggedIn(true);
        setUsername(userName);
        localStorage.setItem('userName', userName);
    }, []);

    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
        setUsername(null);
        localStorage.removeItem('userName');
    }, []);

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setIsLoggedIn(true);
            setUsername(storedUserName);
        }
    }, []);

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
            <Routes>
                <Route path='/club-room' element={<ClubRoom isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />} />
                <Route path='/study-room' element={<StudyRoom isLoggedIn={isLoggedIn} username={username} />} />
                <Route path='/grill' element={<Grill isLoggedIn={isLoggedIn} username={username} />} />
                <Route
                    path='/login'
                    element={<RedirectToExternal url="https://rezervace.buk.cvut.cz:8000/auth_is/login" />}
                />
                <Route path='/logined' element={<Login onLogin={handleLogin}  />} />
                <Route path='/logout' element={<Logout onLogout={handleLogout} />} />
                <Route path='/' element={<ClubRoom isLoggedIn={isLoggedIn} username={username} />} />
            </Routes>
        </div>
    );
}

export default App;
