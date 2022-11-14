import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {
    Home,
    Leaderboard,
    WaitingRoom,
    Quiz,
    Results,
    NotFound,
} from './pages';

function App() {
    return (
        <div className="main-container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/waitingRoom" element={<WaitingRoom />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/results" element={<Results />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
