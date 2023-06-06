import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPlayer } from '../../models/playerModel';
import PlayerName from './components/PlayerName';

const defaultPlayer: IPlayer[] = [
  {
    playerId: 0,
    playerName: 'Player 1',
    currentScore: 0
  },
  {
    playerId: 1,
    playerName: 'Player 2',
    currentScore: 0
  },
]

const GameConfigPage = () => {
  const { gameName } = useParams()

  const [playerList, setPlayerList] = useState<IPlayer[]>(defaultPlayer)

  const changePlayerName = (playerId: number, newName: string): void => {
    const newPlayerList = playerList
    newPlayerList[playerId].playerName = newName
    console.log(newPlayerList)
    setPlayerList([...newPlayerList])
  }

  return (
    <div>
      <div>
        <h1>{gameName}</h1>
      </div>
      <div>
        {playerList.map(player => {
          return (
            <PlayerName key={player.playerId} player={player} changePlayerName={changePlayerName} />
          )
        })}
      </div>
    </div>
  )
}

export default GameConfigPage