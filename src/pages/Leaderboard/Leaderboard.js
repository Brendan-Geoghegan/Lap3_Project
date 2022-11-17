import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
// import { Dimmer, Loader } from "semantic-ui-react";
import { LightSpeed } from "react-reveal";

export default function Leaderboard() {
	const [topScores, setTopScores] = useState();
	useEffect(() => {
		const fetch = async () => {
			const data = await axios.get(
				`https://mandem-quiz.herokuapp.com/leaderboards`
			);
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

// 	const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 500);
//   }, []);

	return (
		<div className="leaderboard-container">
			{/* <div style={{ display: loading ? "block" : "none" }}>
              <Dimmer active>
                <Loader>Loading Leaderboard</Loader>
              </Dimmer>
            </div> */}
			<div className="leaderboard">
				<LightSpeed left>
				<h1>🏆  Leaderboards  🏆</h1>
				</LightSpeed>
				<LightSpeed right><table>
					<tbody>
						<tr id="firstRow">
							<th>Ranking</th>
							<th>Name</th>
							<th>Points</th>
						</tr>

						{topScores?.slice(0, 10).map((user, index) => {
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
				</LightSpeed>
			</div>
		</div>
	);
}
