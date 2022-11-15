import React, { createContext, useState } from "react";


export const QuizContext = createContext();

export const QuizProvider = (props) => {
	const [socket, setSocket] = useState();
	const [allPlayers, setAllPlayers] = useState([]);
	// const [room, setRoom] = useState("10000");
	const [toggle, setToggle] = useState("");
	const [category, setCategory] = useState(9);
	const [difficulty, setDifficulty] = useState("easy");
	// const [data, setData] = useState([]);
	// const [username, setUsername] = useState("");
	const [userData, setUserData] = useState({
		id: "",
		username: "",
		room: "",
		host: false,
		data: [{}],
		score: 0,
		completed: false,
		gameStarted: false
	})


	return (
		<QuizContext.Provider value={{socket, setSocket, allPlayers, setAllPlayers, toggle, setToggle, category, setCategory, difficulty, setDifficulty, userData, setUserData}}>
			{props.children}
		</QuizContext.Provider>
	);
};
