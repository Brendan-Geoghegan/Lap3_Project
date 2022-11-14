import React, { createContext, useState } from "react";

let movieData = [
	{
		name: "Interstellar",
		price: "$20",
		id: 23234,
	},
	{
		name: "Edge Of Tomorrow",
		price: "$5",
		id: 2323424,
	},
	{
		name: "Lord Of The Rings",
		price: "$12",
		id: 23234566,
	},
];

export const MovieContext = createContext();

export const MovieProvider = (props) => {
	const [movies, setMovies] = useState(movieData);

	return (
		<MovieContext.Provider value={[movies, setMovies]}>
			{props.children}
		</MovieContext.Provider>
	);
};
