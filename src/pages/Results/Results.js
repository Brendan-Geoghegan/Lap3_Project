import React, { useContext, useEffect } from "react";
import { Progress } from "semantic-ui-react";
import "./results.css";
import { QuizContext } from "../../context/quizContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Confetti } from "../../components";
import { Bounce } from "react-reveal";

const Results = () => {
	const { userData, socket, results } = useContext(QuizContext);

	useEffect(() => {
		const postData = async () => {
			await axios.post(
				"https://mandem-quiz.herokuapp.com/leaderboards",
				userData
			);
		};
		postData();
		socket.emit("send_scores", {
			username: userData.username,
			room: userData.room,
			score: userData.score,
		});
	}, []);

	const colors = [
		"red",
		"orange",
		"yellow",
		"olive",
		"teal",
		"blue",
		"violet",
		"purple",
		"pink",
		"brown",
		"grey",
		"black",
	];

	return (
		<>
			<Confetti />
			<div id="finalResultspage">
				<div id="finalResultheader">
					<h1>Final Results</h1>
				</div>

				<div id="finalResultsection">
					{results?.map((user, index) => {
						return (
							<Bounce top>
								<section>
									<h2 className="username">User: {user.username}</h2>
									<Progress
										percent={user.score / 10}
										inverted
										color={colors[index]}
										progress
										size="large"
										indicating
									/>
								</section>
							</Bounce>
						);
					})}

					{results.filter((user) => user.username === userData.username)
						.length === 0 && (
						<Bounce top>
							<section>
								<h2 className="username">User: {userData.username}</h2>
								<Progress
									percent={userData.score / 10}
									inverted
									color="green"
									progress
									size="large"
									indicating
								/>
							</section>
						</Bounce>
					)}

					<p className="score">Your Score: {userData.score} / 1000</p>
				</div>
				<Link to="/" className="home-btn">
					Back To home
				</Link>
			</div>
		</>
	);
};

export default Results;
