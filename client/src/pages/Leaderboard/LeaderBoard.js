import React from "react";
import data from "../../data";

export default function LeaderBoard() {
	return (
		<div>
			<h1>LeaderBoard</h1>
			{data.map((user) => {
				return <div>{user.name}</div>;
			})}
		</div>
	);
}
