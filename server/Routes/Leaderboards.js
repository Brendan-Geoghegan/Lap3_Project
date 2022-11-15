const express = require("express");
const Router = express.Router();
const {
	getLeaderboards,
	postIntoLeaderboards,
} = require("../Controllers/Leaderboards");

Router.route("/").get(getLeaderboards).post(postIntoLeaderboards);

module.exports = Router;
