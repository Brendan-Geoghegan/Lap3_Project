const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const Leaderboards = require("./Routes/Leaderboards");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/leaderboards", Leaderboards);

// Default

app.get("/", async (req, res) => {
	try {
		res.status(200).json({ result: "Quiz API" });
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
});

// Listen
const PORT = process.env.PORT || 3001;

const start = async () => {
	try {
		connectDB(process.env.DATABASE_URL);
		app.listen(PORT, () => console.log(PORT));
	} catch (error) {
		console.log(error);
	}
};

start();
