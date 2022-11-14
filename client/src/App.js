import React from "react";
import { Routes, Route } from "react-router-dom";

import {
	Home,
	Leaderboards,
	WaitingRoom,
	Quiz,
	Results,
	NotFound,
} from "./pages";

function App() {
	return (
		<div className="main-container">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/leaderboards" element={<Leaderboards />} />
				<Route path="/waitingRoom" element={<WaitingRoom />} />
				<Route path="/quiz" element={<Quiz />} />
				<Route path="/results" element={<Results />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
