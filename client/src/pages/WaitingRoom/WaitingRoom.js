import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../context/quizContext";
import "./style.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const WaitingRoom = () => {
	const { room, username, allPlayers } = useContext(QuizContext);

	// const navigate = useNavigate();
	const leaveRoom = () => {
		// Sends message to Backend
		socket.emit("leave_room", { room, username });
		// navigate("/");
	};

	const renderPlayers = () => {
		return allPlayers.map((player, index) => {
			console.log(player);
			return (
				<div key={index} className="player">
					<h3>{player.username}</h3>
				</div>
			);
		});
	};

	return (
		<div className="main-container">
			<h1>Waiting for players...</h1>
			<h2>Code: {room}</h2>
			{renderPlayers()}
			<div className="btns">
				<button>Start</button>
				<button onClick={leaveRoom}>Forfeit</button>
			</div>
		</div>
	);
};

export default WaitingRoom;
