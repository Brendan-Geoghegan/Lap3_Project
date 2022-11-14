import React from 'react'
import './waitingRoom.css'

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
        <div className='player'>
          <h3>{player.username}</h3>
        </div>
      )
    })
  )
  
}

const WaitingRoom = () => {
  return (
    <div>
      <h1 className='waiting-for-players'>Waiting for players...</h1>
      <h2>Code: {dummyData.code}</h2>
      <div className='players-list'>
        {renderPlayers()}
      </div>
      <button>Start</button>
      <button>Forfeit</button>
    </div>
  )
}

export default WaitingRoom
