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
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <ul>
                {data.map((user) => {
                    return (
                        <li>
                            <small>{user.ranking}</small>
                            <mark>{user.name}</mark>
                            <small>{user.score}</small>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
