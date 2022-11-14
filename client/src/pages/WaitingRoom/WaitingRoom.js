import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../context/quizContext";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const WaitingRoom = () => {

  const {
		room,
		username,
    allPlayers
   } = useContext(QuizContext)

	// const navigate = useNavigate();
	const leaveRoom = () => {
		// Sends message to Backend
		socket.emit("leave_room", { room, username });
		// navigate("/");
	};

	const renderPlayers = () => {
		return allPlayers.map((player, index) => {
			return (
				<div key={index}>
					<h3>{player.username}</h3>
				</div>
			);
		});
	};

	return (
		<div>
			<h1>Waiting for players...</h1>
			<h2>Code: {room}</h2>
			{renderPlayers()}
			<button>Start</button>
			<button onClick={leaveRoom}>Forfeit</button>
		</div>
	);
};

export default WaitingRoom;
