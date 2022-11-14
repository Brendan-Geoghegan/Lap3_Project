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

const renderPlayers = () => {
  return(
    dummyData.players.map((player) => {
      return (
        <div>
          <h3>{player.username}</h3>
        </div>
      )
    })
  )
  
}

const WaitingRoom = () => {
  return (
    <div>
      <h1>Waiting for players...</h1>
      <h2>Code: {dummyData.code}</h2>
      {renderPlayers()}
      <button>Start</button>
      <button>Forfeit</button>
    </div>
  )
}

export default WaitingRoom
