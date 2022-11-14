import React from "react";
import { Routes, Route } from "react-router-dom";

import {
	Home,
	Leaderboard,
	WaitingRoom,
	Quiz,
	Results,
	NotFound,
} from "./pages";

import { JoinRoom, CreateRoom } from "./components";

function App() {
	return (
		<div className="main-container">
			<Routes>
				{/* Pages */}
				<Route path="/" element={<Home />} />
				<Route path="/leaderboards" element={<Leaderboard />} />
				<Route path="/waitingRoom" element={<WaitingRoom />} />
				<Route path="/quiz" element={<Quiz />} />
				<Route path="/results" element={<Results />} />
				<Route path="*" element={<NotFound />} />
				{/* Components */}
				<Route path="/JoinRoom" element={<JoinRoom />} />
				<Route path="/createRoom" element={<CreateRoom />} />
			</Routes>
		</div>
	);
}

export default App;
