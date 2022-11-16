import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Segment, Grid } from "semantic-ui-react";
import "./style.css";
import axios from "axios";
import { QuizContext } from "../../context/quizContext";

const Quiz = () => {
    const { userData, setUserData, category, difficulty } =
        useContext(QuizContext);
    const [data, setData] = useState([]);
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
				`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
			);
			// RemoveSpecialChars
			const updatedRes = RemoveSpecialChars(res.data.results);
			// Save API Data
			setData(updatedRes);
			// Initial
			setQuestionData((prev) => {
				// Shuffle Array
				const allAnswers = [
					res.data.results[0].correct_answer,
					...res.data.results[0].incorrect_answers,
				];
				const shuffled = shuffle(allAnswers);
				// Return object
				return {
					question: updatedRes[0].question,
					number: 0,
					correctAnswer: updatedRes[0].correct_answer,
					answers: shuffled,
				};
			});
		};
        fetch();
    }, []);

    const shuffle = (array) => {
        const updatedArray = array.map((answer) => {
            let newAnswer = answer;
            if (answer.includes("&Eacute;")) {
                newAnswer = newAnswer.replaceAll("&Eacute;", "É");
            }
            if (answer.includes("&#039;")) {
                newAnswer = newAnswer.replaceAll("&#039;", "'");
            }
            if (answer.includes("&oacute;")) {
                newAnswer = newAnswer.replaceAll("&oacute;", "ó");
            }
            return newAnswer;
        });
        return updatedArray.sort(() => Math.random() - 0.5);
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
            setUserData((prev) => {
                return { ...prev, score: prev.score + 100 };
            });
            // Next Question
            setTimeout(() => {
                e.target.style.backgroundColor = "#e0e1e2";
                nextQuestion();
            }, 100);
        } else {
            // Change color
            e.target.style.backgroundColor = "red";
            // Disable buttons
            btns.forEach((btn) => (btn.disabled = true));
            setTimeout(() => {
                e.target.style.backgroundColor = "#e0e1e2";
                nextQuestion();
            }, 1000);
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


	const RemoveSpecialChars = (data) => {
		return data.map((obj) => {
			// question
			let newQuestion = obj.question;
			if (newQuestion.includes("&#039;")) {
				newQuestion = newQuestion.replaceAll("&#039;", "'");
			}
			if (newQuestion.includes("&quot;")) {
				newQuestion = newQuestion.replaceAll("&quot;", '"');
			}
			if (newQuestion.includes("&shy;")) {
				newQuestion = newQuestion.replaceAll("&shy;", "-");
			}
			if (newQuestion.includes("&Eacute;")) {
				newQuestion = newQuestion.replaceAll("&Eacute;", "É");
			}
			if (newQuestion.includes("&oacute;")) {
				newQuestion = newQuestion.replaceAll("&oacute;", "ó");
			}
			if (newQuestion.includes("&rsquo;")) {
				newQuestion = newQuestion.replaceAll("&rsquo;", "'");
			}
			// answer
			let newCorrect = obj.correct_answer;
			if (newCorrect.includes("&#039;")) {
				newCorrect = newCorrect.replaceAll("&#039;", "'");
			}
			if (newCorrect.includes("&quot;")) {
				newCorrect = newCorrect.replaceAll("&quot;", '"');
			}
			if (newCorrect.includes("&shy;")) {
				newCorrect = newCorrect.replaceAll("&shy;", "-");
			}
			if (newCorrect.includes("&Eacute;")) {
				newCorrect = newCorrect.replaceAll("&Eacute;", "É");
			}
			if (newCorrect.includes("&oacute;")) {
				newCorrect = newCorrect.replaceAll("&oacute;", "ó");
			}
			if (newCorrect.includes("&rsquo;")) {
				newCorrect = newCorrect.replaceAll("&rsquo;", "'");
			}
			// return
			return { ...obj, question: newQuestion, correct_answer: newCorrect };
		});
	};

	return (
		<>
			<div id="quizPage">
				<div id="quizcontent">
					<div className="currentStats">Score: {userData.score}</div>
					<div className="currentStats">Timer: {timer}</div>

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
                                    <Button
                                        onClick={checkAnswer}
                                        className="answer-btn"
                                    >
                                        {questionData?.answers[0]}
                                    </Button>
                                </p>
                                <p>
                                    <Button
                                        onClick={checkAnswer}
                                        className="answer-btn"
                                    >
                                        {questionData?.answers[1]}
                                    </Button>
                                </p>
                            </Grid.Column>
                            <Grid.Column>
                                <p>
                                    <Button
                                        onClick={checkAnswer}
                                        className="answer-btn"
                                    >
                                        {questionData?.answers[2]}
                                    </Button>
                                </p>
                                <p>
                                    <Button
                                        onClick={checkAnswer}
                                        className="answer-btn"
                                    >
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
