import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

export default function Leaderboard() {
	const [topScores, setTopScores] = useState();
	useEffect(() => {
		const fetch = async () => {
			const data = await axios.get(`http://localhost:3001/leaderboards`);
			sortLeaderboards(data.data.result);
		};
		fetch();
	}, []);

	const sortLeaderboards = (data) => {
		setTopScores(
			data?.sort((a, b) => {
				return b.score - a.score;
			})
		);
	};

	return (
		<div className="leaderboard-container">
			<div className="leaderboard">
				<h1>Leaderboards</h1>
				<table>
					<tbody>
						<tr>
							<th>Ranking</th>
							<th>Name</th>
							<th>Points</th>
						</tr>

						{topScores?.map((user, index) => {
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{user.username}</td>
									<td>{user.score}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
