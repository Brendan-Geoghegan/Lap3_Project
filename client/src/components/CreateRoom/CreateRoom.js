import { useEffect, useState } from "react";
import "./style.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const CreateRoom = () => {
	const [room, setRoom] = useState("");
	const [username, setUsername] = useState("");
	const [allPlayers, setAllPlayers] = useState([]);

	const joinRoom = () => {
		// Sends message to Backend
		if (room !== "" && username !== "") {
			socket.emit("join_room", { room, username });
		}
	};

	return (
		<div className="main-container create-room">
			<h1>Create Room</h1>
			{!allPlayers.length && (
				<form onSubmit={joinRoom}>
					<input
						type="text"
						placeholder="Room Code..."
						onChange={(e) => setRoom(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Username..."
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input type="button" value="Join Room" onClick={joinRoom} />
				</form>
			)}
		</div>
	);
};

export default CreateRoom;
