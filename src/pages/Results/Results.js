import React, { useContext, useEffect } from "react";
import { Progress } from "semantic-ui-react";
import "./results.css";
import { QuizContext } from "../../context/quizContext";
import axios from "axios";

const Results = () => {
	const { userData, setUserData } = useContext(QuizContext);

	useEffect(() => {
		const postData = async () => {
			await axios
				.post("https://mandem-quiz.herokuapp.com/leaderboards", userData)
				.then((res) => console.log(res));
		};
		postData();
	}, []);

	return (
		<div id="finalResultspage">
			<div id="finalResultheader">
				<h1>Final Results</h1>
			</div>

			<div id="finalResultsection">
				<section>
					{userData.username}
					<Progress
						percent={userData.score / 10}
						inverted
						color="red"
						progress
					/>
				</section>
				<section>Your Score: {userData.score} / 1000</section>
			</div>

			{/* <div id="finalResultsection">
				<section>
					Player 1<Progress percent={40} inverted color="red" progress />
				</section>
				<section>
					Player 2
					<Progress percent={59} inverted color="orange" progress />
				</section>
				<section>
					Player 3<Progress percent={13} inverted color="yellow" progress />
				</section>
				<section>
					Player 4<Progress percent={37} inverted color="olive" progress />
				</section>
				<section>
					Player 5<Progress percent={83} inverted color="green" progress />
				</section>
				<section>
					Player 6<Progress percent={23} inverted color="teal" progress />
				</section>
				<section>
					Player 7<Progress percent={85} inverted color="blue" progress />
				</section>
				<section>
					Player 8<Progress percent={38} inverted color="violet" progress />
				</section>
				<section>
					Player 9<Progress percent={47} inverted color="purple" progress />
				</section>
				<section>
					Player 10
					<Progress percent={29} inverted color="pink" progress />
				</section>
				<section>
					Player 11
					<Progress percent={68} inverted color="brown" progress />
				</section>
				<section>
					Player 12
					<Progress percent={36} inverted color="grey" progress />
				</section>
				<section>
					Player 13
					<Progress percent={72} inverted color="black" progress />
				</section>
			</div> */}
		</div>
	);
};

export default Results;
