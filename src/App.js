import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { QuizContext } from "./context/quizContext";
import {
	Home,
	Leaderboard,
	WaitingRoom,
	Quiz,
	Results,
	NotFound,
} from "./pages";

import { Room, BackButton } from "./components";

import io from "socket.io-client";
const URL = "https://mandem-quiz.herokuapp.com/";

function App() {
	const navigate = useNavigate();

	const {
		difficulty,
		setDifficulty,
		category,
		setCategory,
		socket,
		setSocket,
		setAllPlayers,
		setUserData,
		setResults,
	} = useContext(QuizContext);

	useEffect(() => {
		const newSocket = io(URL);
		newSocket.on("update_room", (data) => {
			console.log(Object.keys(data[0]).length);
			if (Object.keys(data[0]).length === 3) {
				setResults(data);
			}
			setCategory(data[0].category);
			setDifficulty(data[0].difficulty);
			setAllPlayers(data);
			setUserData((prev) => {
				return { ...prev, room: data[0]?.room };
			});
		});
		setSocket(newSocket);
	}, []);

	// useEffect(() => {
	// 	if (socket) {
	// 		socket.on("game_started", () => {
	// 			navigate("/quiz");
	// 		});
	// 	}
	// }, [socket]);

	useEffect(() => {
		const fetch = async () => {
			const data = await axios.get(
				`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
			);
			setUserData((prev) => {
				return { ...prev, data: data.data.results };
			});
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
				<Route path="/waitingRoom" element={<WaitingRoom />} />
				<Route path="/quiz" element={<Quiz />} />
				<Route path="/results" element={<Results />} />
				<Route path="*" element={<NotFound />} />
				{/* Components */}
				<Route path="/room" element={<Room />} />
			</Routes>
		</main>
	);
}

export default App;
