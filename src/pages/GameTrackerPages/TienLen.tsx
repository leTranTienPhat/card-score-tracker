import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { IPlayer } from '../../models/playerModel';
import RoundRanking from '../../components/RoundRanking';
import { swapValues } from '../../utils/smallUtils';
import GameSideEvent from '../../components/GameSideEvent';
import { ISideEvent } from '../../models/matchModel';

const TienLen = () => {
  const [playerList, setPlayerList] = useState<IPlayer[]>([])
  const [roundRankingList, setRoundRankingList] = useState<Array<number | null>>([])
  const [sideEvents, setSideEvents] = useState<ISideEvent[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const storedPlayerList = localStorage.getItem(`tien-len-playerList`);
    if (storedPlayerList) {
      setPlayerList(JSON.parse(storedPlayerList))
      setRoundRankingList(Array(4).fill(null))
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
      if (playerId !== null) {
        const updatePlayerIdx = newPlayerList.findIndex(player => player.playerId === playerId)
        newPlayerList[updatePlayerIdx].currentScore += score
      }
      score--
    })

    setPlayerList(newPlayerList)
  }

  const addSideEvent = () => {
    const newSideEvents = [...sideEvents]
    newSideEvents.push({
      eventId: crypto.randomUUID()
    })
    setSideEvents(newSideEvents)
  }

  const updateSideEvents = (sideEvent: any) => {
    setSideEvents(sideEvent)
  }

  const removeSideEvent = (idx: number) => {
    const newSideEvents = [...sideEvents]
    newSideEvents.splice(idx, 1)
    setSideEvents(newSideEvents)
  }

  const onFinishRoundBtn = () => {
    scoreCalculateBasedOnRank()
    localStorage.setItem(`tien-len-playerList`, JSON.stringify(playerList));
    setRoundRankingList(Array(playerList.length).fill(null))
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
            <div key={player.playerId}>{player.playerName}: {player.currentScore} điểm</div>
          )
        })}
      </div>

      <div className="flex flex-col gap-4 my-4">
        {roundRankingList.map((round, index) => {
          return (
            <RoundRanking
              key={index}
              place={index}
              playerList={playerList}
              roundRankingList={roundRankingList}
              clearOneRoundRanking={clearOneRoundRanking}
              updateRoundRanking={updateRoundRanking}
            />
          )
        })}
      </div>

      <span className="p-2 cursor-pointer border-2 border-black rounded-full" onClick={() => addSideEvent()}>+</span>
      {sideEvents.map((sideEvent, index) => {
        return (
          <GameSideEvent key={index} playerList={playerList} sideEvent={sideEvent} updateSideEvents={updateSideEvents} removeSideEvent={removeSideEvent} />
        )
      })}

      <div>
        <button onClick={() => onFinishRoundBtn()}>Kết thúc hiệp chơi</button>
        <button onClick={() => onFinishGameBtn()}>Tổng kết trận đấu</button>
      </div>
    </div >
  )

}

export default TienLen