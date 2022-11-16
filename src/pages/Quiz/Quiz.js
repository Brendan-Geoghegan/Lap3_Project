import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Segment, Grid } from "semantic-ui-react";
import "./quiz.css";
import axios from "axios";

const Quiz = () => {
	const [data, setData] = useState([]);
	const [score, setScore] = useState(0);
	const [timer, setTimer] = useState(10);
	const [questionData, setQuestionData] = useState({
		question: "",
		number: 0,
		correctAnswer: "",
		answers: "",
	});
	const navigate = useNavigate();

	useEffect(() => {
		const fetch = async () => {
			const res = await axios.get(
				`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`
			);
			// Save API Data
			setData(res.data.results);
			// Initial
			setQuestionData((prev) => {
				const allAnswers = [
					res.data.results[0].correct_answer,
					...res.data.results[0].incorrect_answers,
				];
				const shuffled = shuffle(allAnswers);
				return {
					question: res.data.results[0].question,
					number: 0,
					correctAnswer: res.data.results[0].correct_answer,
					answers: shuffled,
				};
			});

			// // Render New Question every ? Seconds
			// const timerInterval = setInterval(() => {
			// 	setTimer((prev) => (prev === 0 ? 9 : prev - 1));
			// 	setTotalTime((prev) => prev + 1);
			// }, 1000);
		};

		fetch();
	}, []);

	const shuffle = (array) => {
		return array.sort(() => Math.random() - 0.5);
	};

	const checkAnswer = (e) => {
		const btns = document.querySelectorAll(".answer-btn");
		const answer = e.target.textContent;
		if (answer === questionData.correctAnswer) {
			// Change color
			e.target.style.backgroundColor = "lime";
			// Disable buttons
			btns.forEach((btn) => (btn.disabled = true));
			// Update score
			setScore((prev) => prev + 100);
			// Next Question
			setTimeout(() => {
				e.target.style.backgroundColor = "#e0e1e2";
				nextQuestion();
			}, 3000);
		} else {
			// Change color
			e.target.style.backgroundColor = "red";
			// Disable buttons
			btns.forEach((btn) => (btn.disabled = true));
			setTimeout(() => {
				e.target.style.backgroundColor = "#e0e1e2";
				nextQuestion();
			}, 3000);
		}
	};

	const nextQuestion = () => {
		if (questionData.number === 9) {
			return navigate("/results");
		}
		// Next Question
		setQuestionData((prev) => {
			const allAnswers = [
				data[prev.number + 1].correct_answer,
				...data[prev.number + 1].incorrect_answers,
			];
			const shuffled = shuffle(allAnswers);
			return {
				question: data[prev.number + 1].question,
				number: (prev.number += 1),
				correctAnswer: data[prev.number].correct_answer,
				answers: shuffled,
			};
		});
		// Undisable buttons
		const btns = document.querySelectorAll(".answer-btn");
		btns.forEach((btn) => (btn.disabled = false));
		// !Reset Timer Question
	};

	return (
		<>
			<div id="quizPage">
				<div id="quizcontent">
					<div id="currentScore">Score: {score}</div>
					<div>Timer: {timer}</div>

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
									<Button onClick={checkAnswer} className="answer-btn">
										{questionData?.answers[0]}
									</Button>
								</p>
								<p>
									<Button onClick={checkAnswer} className="answer-btn">
										{questionData?.answers[1]}
									</Button>
								</p>
							</Grid.Column>
							<Grid.Column>
								<p>
									<Button onClick={checkAnswer} className="answer-btn">
										{questionData?.answers[2]}
									</Button>
								</p>
								<p>
									<Button onClick={checkAnswer} className="answer-btn">
										{questionData?.answers[3]}
									</Button>
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
