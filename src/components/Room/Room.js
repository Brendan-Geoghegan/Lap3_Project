import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { QuizContext } from "../../context/quizContext";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");



const Room = () => {
	const navigate = useNavigate();

	const {setRoom,
		socket,
		room,
		toggle,
		setCategory,
		setDifficulty,
		username,
		setUsername} = useContext(QuizContext)

	const createRoom = (e) => {
		e.preventDefault();
		// Sends message to Backend
		if (username !== "") {
			socket.emit("create_room", { username });
			navigate("/waitingRoom");
		}
	};

	const joinRoom = (e) => {
		e.preventDefault();
		// Sends message to Backend
		if (username !== "" && room) {
			socket.emit("join_room", { username, room });
			navigate("/waitingRoom");
		}
	};

	// useEffect(() => {
	// 	socket.off("update_room").on("update_room", (users) => {
	// 		setAllPlayers(users);
	// 		setRoom(users[0]?.room);
	// 	});
	// }, [socket]);

	return (
		<>
			{toggle === "create" ? (
				<>
					<h1>Create Room</h1>
					<div className="main-container create-room">
						<form onSubmit={createRoom}>
							<input
								type="text"
								placeholder="Enter Username..."
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
							<select
								name="category"
								onChange={(e) => setCategory(e.target.value)}
							>
								<option value={9}>General Knowledge</option>
								<option value={11}>Movies</option>
								<option value={14}>TV</option>
								<option value={27}>Animals</option>
								<option value={15}>Video Games</option>
								<option value={29}>Comics</option>
								<option value={31}>Anime</option>
							</select>
							<select
								name="difficulty"
								onChange={(e) => setDifficulty(e.target.value)}
							>
								<option value="easy">Easy</option>
								<option value="medium">Medium</option>
								<option value="hard">Hard</option>
							</select>

							<input type="submit" value="Create Room" />
						</form>
					</div>
				</>
			) : (
				<>
					<h1>Join Room</h1>
					<div className="main-container create-room">
						<form onSubmit={joinRoom}>
							<input
								type="text"
								placeholder="Enter Room..."
								onChange={(e) => setRoom(e.target.value)}
								required
							/>
							<input
								type="text"
								placeholder="Enter Username..."
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
							<input type="submit" value="Join Room" />
						</form>
					</div>
				</>
			)}
		</>
	);
};

export default Room;
