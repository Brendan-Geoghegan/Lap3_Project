import React, { createContext, useState } from "react";


export const QuizContext = createContext();

export const QuizProvider = (props) => {
	const [socket, setSocket] = useState();
	const [allPlayers, setAllPlayers] = useState([]);
	const [room, setRoom] = useState("10000");
	const [toggle, setToggle] = useState("");
	const [category, setCategory] = useState(9);
	const [difficulty, setDifficulty] = useState("easy");
	const [data, setData] = useState([]);
	const [username, setUsername] = useState("");


	return (
		<QuizContext.Provider value={{socket, setSocket, allPlayers, setAllPlayers, room, setRoom, toggle, setToggle, category, setCategory, difficulty, setDifficulty, data, setData, username, setUsername}}>
			{props.children}
		</QuizContext.Provider>
	);
};
