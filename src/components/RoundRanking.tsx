import { IPlayer } from "../models/playerModel"
import { useState } from "react"
import DivWithLeftArrow from "./DivWithArrow/DivWithLeftArrow"
import { findPlayerNameById, findPlayerRankingById } from "../utils/smallUtils"

interface IProps {
  place: number,
  playerList: IPlayer[],
  roundRankingList: Array<number | null>,
  updateRoundRanking: (idx: number, playerId: number) => void,
  clearOneRoundRanking: (idx: number) => void
}

const RoundRanking = ({ place, playerList, roundRankingList, updateRoundRanking, clearOneRoundRanking }: IProps) => {
  const [isOpenSelectionMenu, setIsOpenSelectionMenu] = useState<boolean>(false)
  const toggleSelectionMenu = () => {
    setIsOpenSelectionMenu(!isOpenSelectionMenu)
  }

  const handleSelectPlayer = (playerId: number) => {
    updateRoundRanking(place, playerId)
    toggleSelectionMenu()
  }

  return (
    <div className="flex items-center">
      <span className="px-2 border-2 border-red-400 rounded-full">{place + 1}</span>
      <div className="relative" >
        {/* Display Current Ranking Player */}
        <span>{findPlayerNameById(playerList, (roundRankingList[place] as number))}</span>

        {/* Change Current Ranking Player */}
        <span className="p-2 ml-4  cursor-pointer border-2 border-black rounded-full" onClick={() => toggleSelectionMenu()}>+</span>

        {isOpenSelectionMenu &&
          <DivWithLeftArrow
            className="absolute w-[200px] top-1/2 transform -translate-y-1/2 left-[calc(100%+15px)]"
            isOpenSelectionMenu={isOpenSelectionMenu}
            toggleSelectionMenu={toggleSelectionMenu}
          >
            <ul className="divide-y-[1px] ">
              {playerList.map(player => {
                return (
                  <li key={player.playerId} onClick={() => handleSelectPlayer(player.playerId)} className="p-2 hover:bg-red-200 cursor-pointer">
                    <div className="flex justify-between">
                      <p>{player.playerName}</p>
                      <p>{findPlayerRankingById(roundRankingList, player.playerId)}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </DivWithLeftArrow>
        }
      </div>
      {findPlayerNameById(playerList, (roundRankingList[place] as number)) && <button className="ml-4 border-2 border-black rounded-full p-2" onClick={() => clearOneRoundRanking(place)}>X</button>}
    </div>
  )
}

export default RoundRanking