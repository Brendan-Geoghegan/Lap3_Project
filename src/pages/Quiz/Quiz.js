import React, { useEffect, useState } from "react";
import { Button, Header, Segment, Grid } from "semantic-ui-react";
import "./quiz.css";
import axios from "axios";

const Quiz = () => {
	const [timer, setTimer] = useState(10);
	const [questionData, setQuestionData] = useState({
		question: "",
		number: 0,
		answers: "",
	});

	useEffect(() => {
		const fetch = async () => {
			const data = await axios.get(
				`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`
			);

			// Initial
			setQuestionData((prev) => {
				const allAnswers = [
					data.data.results[0].correct_answer,
					...data.data.results[0].incorrect_answers,
				];
				const shuffled = shuffle(allAnswers);
				return {
					question: data.data.results[0].question,
					number: 0,
					correctAnswer: data.data.results[0].correct_answer,
					answers: shuffled,
				};
			});
			// Render New Question every ? Seconds
			const quizInterval = setInterval(() => {
				console.log(questionData);
				if (questionData.number === 2) {
					clearInterval(quizInterval);
					return;
				}
				setQuestionData((prev) => {
					const allAnswers = [
						data.data.results[prev.number + 1].correct_answer,
						...data.data.results[prev.number + 1].incorrect_answers,
					];
					const shuffled = shuffle(allAnswers);
					return {
						question: data.data.results[prev.number + 1].question,
						number: (prev.number += 1),
						correctAnswer: data.data.results[prev.number].correct_answer,
						answers: shuffled,
					};
				});
			}, 10000);
			// Render New Question every ? Seconds
			setInterval(() => {
				setTimer((prev) => (prev === 0 ? 9 : prev - 1));
			}, 1000);
		};
		fetch();
	}, []);

	const shuffle = (array) => {
		return array.sort(() => Math.random() - 0.5);
	};
	return (
		<>
			<div id="quizPage">
				<div id="quizcontent">
					<div id="currentScore">Timer: {timer}</div>

					<div id="questionSection">
						<Header as="h2" attached="top">
							Question {questionData?.number + 1}
						</Header>
						<Segment attached>{questionData?.question}</Segment>
					</div>

					<div id="answerSection">
						<Grid id="answerGrid" columns={2} relaxed="very">
							<Grid.Column>
								<p>
									<Button>{questionData?.answers[0]}</Button>
								</p>
								<p>
									<Button>{questionData?.answers[1]}</Button>
								</p>
							</Grid.Column>
							<Grid.Column>
								<p>
									<Button>{questionData?.answers[2]}</Button>
								</p>
								<p>
									<Button>{questionData?.answers[3]}</Button>
								</p>
							</Grid.Column>
						</Grid>
					</div>
				</div>
			</div>
		</>
	);
};

export default Quiz;
