import { useEffect, useState } from "react";
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

	const leaveRoom = () => {
		socket.emit("leave_room", { room, username });
		window.location.reload();
		// setRoom("");
		// setUsername("");
		// setAllPlayers([]);
	};

	useEffect(() => {
		socket.off("update_room").on("update_room", (users) => {
			setAllPlayers(users);
		});
	}, [socket]);
	return (
		<div>
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
			<h1>Players:</h1>
			<div className="all-players">
				{allPlayers.map((user, i) => (
					<p key={i}>{user.username}</p>
				))}
			</div>
			<button onClick={leaveRoom}>Leave</button>
		</div>
	);
};

export default CreateRoom;
