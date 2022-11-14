
import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import { QuizContext } from "./context/quizContext";

import {
	Home,
	Leaderboard,
	WaitingRoom,
	Quiz,
	Results,
	NotFound,
} from './pages';


import { Room, BackButton } from "./components";

function App() {

	const {
		difficulty,
		category,
		setData
	 } = useContext(QuizContext)


	useEffect(() => {
		const fetch = async () => {
			const data = await axios.get(
				`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`
			);
			setData(data);
		};
		fetch();
	}, [category, difficulty]);

	return (
		<main>
			<BackButton />
			<Routes>
				{/* Pages */}
				<Route path="/" element={<Home />} />
				<Route path="/leaderboard" element={<Leaderboard />} />
				<Route
					path="/waitingRoom"
					element={
						<WaitingRoom />
					}
				/>
				<Route path="/quiz" element={<Quiz />} />
				<Route path="/results" element={<Results />} />
				<Route path="*" element={<NotFound />} />
				{/* Components */}
				<Route
					path="/room"
					element={
						<Room />
					}
				/>
			</Routes>
		</main>
	);
}

export default App;
