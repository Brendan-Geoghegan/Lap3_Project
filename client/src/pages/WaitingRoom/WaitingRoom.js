import React from 'react'

const dummyData = {
  code: "ABCD",
  players: [
    {
      username: "Brendan" 
    },
    {
      username: "Matt" 
    },
    {
      username: "Ahmed" 
    },
    {
      username: "Dave" 
    }
  ]
}

const WaitingRoom = () => {
  return (
    <div>
      <h1>Waiting for players...</h1>
      <h2>Code: {dummyData.code}</h2>
    </div>
  )
}

export default WaitingRoom
