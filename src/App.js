
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
		socket,
		setSocket,
		setAllPlayers,
		setUserData
	} = useContext(QuizContext)

	useEffect(() => {
		const newSocket = io(URL)
		newSocket.on("update_room", (users) => {
			setAllPlayers(users);
			setUserData(prev => {
				return {...prev, room: users[0]?.room}
			});
		});
		// newSocket.on("game_started", () => {
		// 	console.log("Game started");
		// 	navigate("/quiz")
		// });
		setSocket(newSocket)
	}, [])

	useEffect(() => {
		if(socket) {
			socket.on("game_started", () => {
				console.log(2);
				navigate("/quiz")
			});
		}
		
	}, [socket]);


	useEffect(() => {
		const fetch = async () => {
			const data = await axios.get(
				`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
			);
			setUserData(prev => {
				return {...prev, data: data.data.results}
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
