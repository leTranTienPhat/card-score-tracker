import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { IPlayer } from '../../models/playerModel';
import RoundRanking from '../../components/RoundRanking';
import { swapValues } from '../../utils/smallUtils';

const TienLen = () => {
  const [playerList, setPlayerList] = useState<IPlayer[]>([])
  const [roundRankingList, setRoundRankingList] = useState<Array<number | null>>([])
  const navigate = useNavigate()

  useEffect(() => {
    const storedPlayerList = localStorage.getItem(`tien-len-playerList`);
    if (storedPlayerList) {
      setPlayerList(JSON.parse(storedPlayerList))
      setRoundRankingList(Array(playerList.length).fill(null))
    }
    else navigate('/')
  }, [navigate, playerList.length])

  const updateRoundRanking = (idx: number, playerId: number) => {
    let newRoundRankingList = [...roundRankingList]

    //Case 1: User select the same player in the same place
    if (roundRankingList[idx] === playerId) {
      return
    }

    //Case 2: User select the player that currently exist in another place
    if (roundRankingList.includes(playerId)) {
      const swapPlaceIdx = roundRankingList.indexOf(playerId)
      newRoundRankingList = swapValues(roundRankingList, idx, swapPlaceIdx)
      setRoundRankingList(newRoundRankingList)
      return
    }

    //Case 3: User select the player in an occupied place, but without anywhere to swap to (user selected player doesn't exist yet)
    newRoundRankingList[idx] = playerId
    setRoundRankingList(newRoundRankingList)
  }

  // const updatePlayerScore = () => {
  //   console.log("asd")
  // }

  const clearOneRoundRanking = (idx: number) => {
    const newRoundRankingList = [...roundRankingList]
    newRoundRankingList[idx] = null
    setRoundRankingList(newRoundRankingList)
  }

  const scoreCalculateBasedOnRank = () => {
    const newPlayerList = [...playerList]

    let score = 2
    roundRankingList.forEach(playerId => {
      if (score === 0) score--
      const updatePlayerIdx = newPlayerList.findIndex(player => player.playerId === playerId)
      newPlayerList[updatePlayerIdx].currentScore += score
      score--
    })

    setPlayerList(newPlayerList)
  }

  const onFinishRoundBtn = () => {
    scoreCalculateBasedOnRank()
    console.log()
  }

  const onFinishGameBtn = () => {
    console.log(playerList)

    // localStorage.clear();
    // navigate('/')
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
            <RoundRanking
              key={player.playerId}
              place={player.playerId}
              playerList={playerList}
              roundRankingList={roundRankingList}
              clearOneRoundRanking={clearOneRoundRanking}
              updateRoundRanking={updateRoundRanking} />
          )
        })}
      </div>

      <div>
        <button onClick={() => onFinishRoundBtn()}>Kết thúc hiệp chơi</button>
        <button onClick={() => onFinishGameBtn()}>Tổng kết trận đấu</button>
      </div>
    </div >
  )

}

export default TienLen