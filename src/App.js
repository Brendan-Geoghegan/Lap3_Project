
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
} from './pages';


import { Room, BackButton } from "./components";


import io from "socket.io-client";
const URL = "http://localhost:3001"


function App() {

	const navigate = useNavigate()

	const {
		difficulty,
		category,
		setData,
		socket,
		setSocket,
		setAllPlayers,
		setRoom,
	 } = useContext(QuizContext)

	useEffect(() => {
		const newSocket = io(URL)
		newSocket.on("update_room", (users) => {
			setAllPlayers(users);
			setRoom(users[0]?.room);
		});
		newSocket.on("game_started", (users) => {
			navigate("/quiz")
		});
		setSocket(newSocket)
	}, [])


	useEffect(() => {
		const fetch = async () => {
			const data = await axios.get(
				`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
			);
			setData(data.data.results);
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
