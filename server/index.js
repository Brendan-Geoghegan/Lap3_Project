const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./db/connect");
const Leaderboards = require("./Routes/Leaderboards");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

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
			host: true,
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
		// Crate User
		const user = {
			username,
			room,
			id: socket.id,
			host: false,
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
		// sending updated players to host
		const host = users.find((users) => users.host);
		io.to(host.id).emit(
			"update_room",
			users.filter((users) => users.room == room)
		);
	});

	socket.on("leave_room", ({ room, username }) => {
		// Remove User from Array
		users = users.filter(
			(users) => users.username !== username && users.room === room
		);
		// Leave Room
		socket.leave(room);
		// Send Updated Users Array
		socket.to(room).emit("update_room", users);
		// Leave Room
		socket.disconnect();
	});
	socket.on("disconnect", () => {});

	socket.on("disconnect", () => {
		console.log("disconnect running");
		// Get Disconnect User Room
		const disconnectUser = users.filter((users) => users.id === socket.id)[0];
		// Remove User from Room
		users = users.filter((user) => user.id !== socket.id);
		// Send Updated Users Array
		io.sockets.in(disconnectUser?.room).emit(
			"update_room",
			users.filter((user) => user.room === disconnectUser?.room)
		);
	});

	// 	socket.on("leave_room", ({ room, username }) => {
	// 		// Remove User from Array
	// 		console.log("users before", users);
	// 		users = users.filter(
	// 			(users) => users.username !== username && users.room == room
	// 		);
	// 		socket.leave(room);
	// 		console.log("users after", users);
	// 		// Send Updated Users Array
	// 		socket.to(room).emit("update_room", users);
	// 		// Leave Room
	// 		socket.disconnect()
	// 	});

	// 	socket.on("disconnect", () => {
	// 		// Get Disconnect User Room
	// 		const disconnectUser = users.filter((users) => users.id === socket.id)[0];
	// 		// Remove User from Room
	// 		users = users.filter((user) => user.id !== socket.id);
	// 		// Send Updated Users Array
	// 		io.sockets.in(disconnectUser?.room).emit(
	// 			"update_room",
	// 			users.filter((user) => user.room === disconnectUser?.room)
	// 		);
	// 		console.log(users);
	// 	});
});

// routes
app.use("/leaderboards", Leaderboards);

// Listen
const PORT = process.env.PORT || 3001;

const start = async () => {
	try {
		connectDB(process.env.DATABASE_URL);
		server.listen(PORT, () => console.log(PORT));
	} catch (error) {
		console.log(error);
	}
};

start();
