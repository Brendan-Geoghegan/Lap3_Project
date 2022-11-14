<<<<<<< HEAD
import React from 'react'
import './waitingRoom.css'
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
>>>>>>> 5b562f8df604395f6f809dc184f84e892e592ea2

// const dummyData = {
// 	code: "ABCD",
// 	players: [
// 		{
// 			username: "Brendan",
// 		},
// 		{
// 			username: "Matt",
// 		},
// 		{
// 			username: "Ahmed",
// 		},
// 		{
// 			username: "Dave",
// 		},
// 	],
// };

<<<<<<< HEAD
const renderPlayers = () => {
  return(
    dummyData.players.map((player) => {
      return (
        <div className='player'>
          <h3>{player.username}</h3>
        </div>
      )
    })
  )
  
}

const WaitingRoom = () => {
  return (
    <div>
      <h1 className='waiting-for-players'>Waiting for players...</h1>
      <h2>Code: {dummyData.code}</h2>
      <div className='players-list'>
        {renderPlayers()}
      </div>
      <button>Start</button>
      <button>Forfeit</button>
    </div>
  )
}
=======
const WaitingRoom = ({ username, room, allPlayers }) => {
	const navigate = useNavigate();
	const leaveRoom = () => {
		// Sends message to Backend
		socket.emit("leave", { room, username });
		navigate("/");
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
>>>>>>> 5b562f8df604395f6f809dc184f84e892e592ea2

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
