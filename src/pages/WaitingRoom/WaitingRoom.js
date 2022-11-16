import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../context/quizContext";
import "./style.css";

const WaitingRoom = () => {
	const { allPlayers, userData, socket } = useContext(QuizContext);
	const [isHost, setIsHost] = useState(false);

	const navigate = useNavigate();
	const startQuiz = () => {
		// Sends message to Backend
		socket.emit("start_quiz", { room: userData.room, data: userData.data });
		navigate("/quiz");
	};

	const findHost = () => {
		setIsHost(
			allPlayers.filter(
				(user) => user.host && user.username === userData.username
			).length > 0
		);
	};

	useEffect(() => {
		findHost();
	}, [allPlayers]);

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
			<h2>{userData?.room}</h2>
			{renderPlayers()}
			<div className="btns">
				{/* {isHost && <button onClick={startQuiz}>Start</button>} */}
				<button onClick={startQuiz}>Start</button>
				<button>Forfeit</button>
			</div>
		</div>
	);
};

export default WaitingRoom;
