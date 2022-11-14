
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

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
	const [allPlayers, setAllPlayers] = useState([]);
	const [roomies, setRoomies] = useState("10000");
	const [toggle, setToggle] = useState("");
	const [category, setCategory] = useState(9);
	const [difficulty, setDifficulty] = useState("easy");
	const [data, setData] = useState([]);
	const [username, setUsername] = useState("");

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
				<Route path="/" element={<Home setToggle={setToggle} />} />
				<Route path="/leaderboard" element={<Leaderboard />} />
				<Route
					path="/waitingRoom"
					element={
						<WaitingRoom
							allPlayers={allPlayers}
							roomies={roomies}
							setAllPlayers={setAllPlayers}
							setRoomies={setRoomies}
							category={category}
							difficulty={difficulty}
							username={username}
						/>
					}
				/>
				<Route path="/quiz" element={<Quiz />} />
				<Route path="/results" element={<Results />} />
				<Route path="*" element={<NotFound />} />
				{/* Components */}
				<Route
					path="/room"
					element={
						<Room
							setAllPlayers={setAllPlayers}
							setRoomies={setRoomies}
							allPlayers={allPlayers}
							toggle={toggle}
							setCategory={setCategory}
							setDifficulty={setDifficulty}
							setUsername={setUsername}
							username={username}
						/>
					}
				/>
			</Routes>
		</main>
	);
}

export default App;
