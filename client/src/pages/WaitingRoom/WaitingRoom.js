import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../context/quizContext";
import "./style.css";
import io from "socket.io-client";


const WaitingRoom = () => {
	const { room, username, allPlayers, data } = useContext(QuizContext);
	const [isHost, setIsHost] = useState(false)

	const socket = io.connect("http://localhost:3001");

	const navigate = useNavigate();
	const startQuiz = () => {
		// Sends message to Backend
		socket.emit("start_quiz", { room, username, data });
		navigate("/quiz");
	};

	useEffect(() => {
		console.log(1);
		socket.on("game_started", (users) => {
			console.log(2);
			navigate("/quiz")
		});
		return () => {
			socket.off("game_started");
		}
	}, [socket]);

	const findHost = () => {
		setIsHost(allPlayers.filter(user => user.host && user.username === username).length > 0)
	}

	useEffect(() => {
		findHost()
	}, [allPlayers])
	

	const renderPlayers = () => {
		return allPlayers.map((player, index) => {
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
				{isHost && <button onClick={startQuiz}>Start</button>}
				<button>Forfeit</button>
			</div>
		</div>
	);
};

export default WaitingRoom;
