import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { IPlayer } from '../../models/playerModel';
import { IGame } from '../../models/gameModel';
import { hasDuplicateNames } from '../../utils/smallUtils';
import PlayerName from './components/PlayerName';

interface IRouterState {
  selectedGame: IGame;
}

const GameConfigPage = () => {
  const { gameName } = useParams()
  const { state } = useLocation();
  const { selectedGame } = state as IRouterState

  const [playerList, setPlayerList] = useState<IPlayer[]>([])
  const [numberOfPlayer, setNumberOfPlayer] = useState<string | number>(selectedGame.recommendNumberOfPlayer)
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedPlayerList = localStorage.getItem(`${gameName}-playerList`);

    if (storedPlayerList) {
      setIsGameRunning(true)
      setPlayerList(JSON.parse(storedPlayerList))
      setNumberOfPlayer(JSON.parse(storedPlayerList).length)
    }
    else {
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
    }
  }, [selectedGame, gameName])

  const changePlayerName = (playerId: number, newName: string): void => {
    const newPlayerList = [...playerList]
    newPlayerList[playerId].playerName = newName
    setPlayerList(newPlayerList)
  }

  const resetPlayerScore = () => {
    const newPlayerList = [...playerList].map(player => {
      return { ...player, currentScore: 0 }
    })
    setPlayerList(newPlayerList)
    localStorage.setItem(`${gameName}-playerList`, JSON.stringify(newPlayerList));
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
    if (isGameRunning) {
      const warningText = "Băt đầu game mới sẽ xóa dữ liệu của game cũ, bạn có chắc muốn bắt đầu game mới không?"
      if (!confirm(warningText)) return
    }

    const duplicatedNames = hasDuplicateNames(playerList)
    if (duplicatedNames) {
      const [names] = duplicatedNames.values();
      alert(`Duplicate ${names}`)
      return
    }

    resetPlayerScore()
    setIsGameRunning(true)
    navigate(`/score/${gameName}`, { state: { selectedGame } })
  }

  const onContinueBtn = () => {
    navigate(`/score/${gameName}`, { state: { selectedGame } })
  }

  const onCancelGameBtn = () => {
    localStorage.removeItem(`${gameName}-playerList`);
    location.reload();
  }

  return (
    <div>
      <div>
        <h1>{selectedGame.name}{isGameRunning && " (Game đang tiếp diễn)"}</h1>
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
        <button className="border-2 border-blue-500 p-2" onClick={() => onStartGameBtn()}>{isGameRunning ? "Bắt đầu game mới" : "Bắt đầu"}</button>
        {isGameRunning && <button className="border-2 border-blue-500 p-2" onClick={() => onContinueBtn()}>Tiếp tục</button>}
        {isGameRunning && <button className="border-2 border-blue-500 p-2" onClick={() => onCancelGameBtn()}>Hủy trận đấu</button>}
      </div>
    </div>
  )
}

export default GameConfigPage