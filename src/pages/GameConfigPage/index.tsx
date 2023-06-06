import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IPlayer } from '../../models/playerModel';
import PlayerName from './components/PlayerName';
import { IGame } from '../../models/gameModel';
import { hasDuplicateNames } from '../../utils/smallUtils';
import { useNavigate } from "react-router-dom";

interface IRouterState {
  selectedGame: IGame;
}

// const defaultPlayer: IPlayer[] = [
//   {
//     playerId: 0,
//     playerName: 'Player 1',
//     currentScore: 0
//   },
//   {
//     playerId: 1,
//     playerName: 'Player 2',
//     currentScore: 0
//   },
// ]

const GameConfigPage = () => {
  const { gameName } = useParams()
  const { state } = useLocation();
  const { selectedGame } = state as IRouterState

  const [playerList, setPlayerList] = useState<IPlayer[]>([])
  const [numberOfPlayer, setNumberOfPlayer] = useState<string | number>(selectedGame.recommendNumberOfPlayer)
  const navigate = useNavigate()

  useEffect(() => {
    const newPlayerList: IPlayer[] = []
    for (let playerCount = 0; playerCount < selectedGame.recommendNumberOfPlayer; playerCount++) {
      const newPlayer = {
        playerId: playerCount,
        playerName: `Player ${playerCount + 1}`,
        currentScore: 0
      }
      newPlayerList.push(newPlayer)
    }
    setPlayerList(newPlayerList)
  }, [selectedGame])

  const changePlayerName = (playerId: number, newName: string): void => {
    const newPlayerList = [...playerList]
    newPlayerList[playerId].playerName = newName
    setPlayerList(newPlayerList)
  }

  const updatePlayerList = () => {
    const newPlayerList = [...playerList]
    let numOfNewPlayers = Number(numberOfPlayer) - newPlayerList.length

    while (numOfNewPlayers !== 0) {
      if (numOfNewPlayers > 0) {
        const newPlayerId = newPlayerList.length
        newPlayerList.push(
          {
            playerId: newPlayerId,
            playerName: `Player ${newPlayerId + 1}`,
            currentScore: 0
          }
        )
        numOfNewPlayers--
      }
      else {
        newPlayerList.pop()
        numOfNewPlayers++
      }
    }
    setPlayerList(newPlayerList)
  }

  const onStartGameBtn = () => {
    const duplicatedNames = hasDuplicateNames(playerList)
    if (duplicatedNames) {
      const [names] = duplicatedNames.values();
      alert(`Duplicate ${names}`)
    }
    else {
      navigate(`/score/${gameName}`, { state: { selectedGame } })
    }
  }

  return (
    <div>
      <div>
        <h1>{selectedGame.name}</h1>
      </div>
      <div>Số lượng người chơi: </div>
      <input type="number" className="border-2 border-red-500" value={numberOfPlayer} onChange={(e) => setNumberOfPlayer(e.target.value)} onBlur={() => updatePlayerList()} />
      <div>
        {playerList.map(player => {
          return (
            <PlayerName key={player.playerId} player={player} changePlayerName={changePlayerName} />
          )
        })}
      </div>
      <div>
        <button className="border-2 border-blue-500 p-2" onClick={() => onStartGameBtn()}>Start</button>
      </div>
    </div>
  )
}

export default GameConfigPage