import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import "./main.css";
import { QuizProvider } from "./context/quizContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<QuizProvider>
		<Router>
			<App />
		</Router>
	</QuizProvider>
);
