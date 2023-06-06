import { useState, useEffect } from 'react'
import { IPlayer } from '../../models/playerModel';
import { useNavigate } from 'react-router-dom';
import RoundRanking from '../../components/RoundRanking';

const TienLen = () => {
  const [playerList, setPlayerList] = useState<IPlayer[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const storedPlayerList = localStorage.getItem(`tien-len-playerList`);
    if (storedPlayerList) setPlayerList(JSON.parse(storedPlayerList))
    else navigate('/')
  }, [navigate])

  const updatePlayerScore = () => {
    console.log("asd")
  }

  const onFinishBtn = () => {
    localStorage.clear();
    navigate('/')
  }

  return (
    <div>
      <h1>Tiến lên</h1>
      <div>
        {playerList.map(player => {
          return (
            <div key={player.playerId}>{player.playerName}: {player.currentScore} point</div>
          )
        })}
      </div>

      <div className="flex flex-col gap-4 my-4">
        {playerList.map(player => {
          return (
            <RoundRanking key={player.playerId} place={player.playerId + 1} playerList={playerList} updatePlayerScore={updatePlayerScore} />
          )
        })}
      </div>

      <div>
        <button onClick={() => onFinishBtn()}>Kết thúc</button>
      </div>
    </div>
  )

}

export default TienLen