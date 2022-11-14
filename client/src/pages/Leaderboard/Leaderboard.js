import React from 'react';
import './style.css';

const data = [
    { name: 'David', ranking: 1, score: 200 },
    { name: 'Brendon', ranking: 2, score: 1000 },
    { name: 'Matt', ranking: 3, score: 300 },
    { name: 'Ahmed', ranking: 4, score: 500 },
];

export default function Leaderboard() {
    return (
        <div className="leaderboard-container">
            <div className="leaderboard">
                <h1>Leaderboard</h1>
                <table>
                    <tr>
                        <th>Ranking</th>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>

                    {data.map((user) => {
                        return (
                            <tr>
                                <td>{user.ranking}</td>
                                <td>{user.name}</td>
                                <td>{user.score}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
}
