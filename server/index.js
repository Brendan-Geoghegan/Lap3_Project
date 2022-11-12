const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server Listening on Port ${PORT}.`);
});

// GET Leaderboards

app.get("/leaderboards", (req, res) => {
	res.json({
		leaderboards: [{ username: "testUser1", score: 550 }],
	});
});

// POST Leaderboards

module.exports = app;
