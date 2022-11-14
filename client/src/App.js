import React from "react";
import { Routes, Route } from 'react-router-dom';

import { Home, Leaderboards, WaitingRoom, Quiz, Results, NotFound} from "./pages";

function App() {
<<<<<<< HEAD
    return (
        <div className="App">
            <h1>App</h1>
        </div>
    );
=======
	return (
		<div className="main-container">
		<Routes>
		<Route path="/" element={<Home/>} />
		<Route path="/leaderboards" element={<Leaderboards/>} />
		<Route path="/waitingRoom" element={<WaitingRoom/>} />
		<Route path="/quiz" element={<Quiz/>} />
		<Route path="/results" element={<Results/>} />
		<Route path="*" element={<NotFound/>} />
		</Routes>
		</div>
	)
>>>>>>> ee507db1488be1d7c54a6169325a14c3f640a011
}

export default App;
