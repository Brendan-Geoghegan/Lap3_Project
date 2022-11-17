import React, { useContext, useEffect, useState } from "react";
import TypewriterComponent from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../context/quizContext";
import "./style.css";
import { Dimmer, Loader } from "semantic-ui-react";

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

	const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

	return (
		<div className="main-container">
			 <div style={{ display: loading ? "block" : "none" }}>
              <Dimmer active>
                <Loader>Rendering Waiting Room</Loader>
              </Dimmer>
            </div>
			<h1><TypewriterComponent
			options={{
				strings: ["Waiting for players ..."],
				autoStart: true,
				pauseFor: 10000000000,
			}}/></h1>

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
