import React from 'react';

export default function LeaderBoard({ data }) {
    return (
        <div>
            <h1>LeaderBoard</h1>
            {data.map((user) => {
                return <div>{user.name}</div>;
            })}
        </div>
    );
}
