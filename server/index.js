const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Middleware
app.use(cors());

// Create Server
const server = http.createServer(app);

// Socket.io new Server
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

// Socket.io events
let users = [];

io.on("connection", (socket) => {
	socket.on("create_room", ({ username }) => {
		// Generate Random Room number
		const room = Math.floor(Math.random() * 10);
		// Crate User
		const user = {
			username,
			room,
			id: socket.id,
		};
		// Push User To array
		users.push(user);
		// Join Room
		socket.join(room);
		// Send All Users Array
		io.sockets.in(room).emit(
			"update_room",
			users.filter((users) => users.room == room)
		);
	});

	socket.on("join_room", ({ username, room }) => {
		console.log("user trying to join room: ", room);
		// Crate User
		const user = {
			username,
			room,
			id: socket.id,
		};
		// Push User To array
		users.push(user);
		// Join Room
		socket.join(room);
		// Send All Users Array
		io.sockets.in(room).emit(
			"update_room",
			users.filter((users) => users.room == room)
		);
		console.log(users);
	});

	socket.on("leave_room", ({ room, username }) => {
		// Remove User from Array
		users = users.filter(
			(users) => users.username !== username && users.room === room
		);
		// Send Updated Users Array
		socket.to(room).emit("update_room", users);
		// Leave Room
		socket.disconnect();
	});

	socket.on("disconnect", () => {
		// Get Disconnect User Room
		const disconnectUser = users.filter((users) => users.id === socket.id)[0];
		// Remove User from Room
		users = users.filter((user) => user.id !== socket.id);
		// Send Updated Users Array
		io.sockets.in(disconnectUser?.room).emit(
			"update_room",
			users.filter((user) => user.room === disconnectUser?.room)
		);
		console.log(users);
	});
});

// Listen
const PORT = 3001;
server.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
