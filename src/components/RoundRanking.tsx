import { IPlayer } from "../models/playerModel"
import { useState } from "react"
import DivWithLeftArrow from "./DivWithArrow/DivWithLeftArrow"
interface IProps {
  place: number,
  playerList: IPlayer[],
  updatePlayerScore: () => void
}

const RoundRanking = ({ place, playerList }: IProps) => {
  const [isOpenSelectionMenu, setIsOpenSelectionMenu] = useState<boolean>(false)

  const toggleSelectionMenu = () => {
    setIsOpenSelectionMenu(!isOpenSelectionMenu)
  }

  const handleSelectPlayer = () => {
    toggleSelectionMenu()
  }

  return (
    <div className="flex">
      <span className="px-2 border-2 border-red-400 rounded-full">{place}</span>
      <div className="relative" >
        {/* Display Current Ranking Player */}
        <span>ASDASDAS</span>

        {/* Change Current Ranking Player */}
        <span className="p-2 cursor-pointer border-2 border-black rounded-full" onClick={() => toggleSelectionMenu()}>+</span>

        {isOpenSelectionMenu &&
          <DivWithLeftArrow className="absolute w-[200px] top-1/2 transform -translate-y-1/2 left-[calc(100%+15px)]" isOpenSelectionMenu={isOpenSelectionMenu} toggleSelectionMenu={toggleSelectionMenu}>
            <ul className="divide-y-[1px] ">
              {playerList.map(player => {
                return (
                  <li key={player.playerId} onClick={() => handleSelectPlayer()} className="p-2 ">{player.playerName}</li>
                )
              })}
            </ul>
          </DivWithLeftArrow>
        }

      </div>
    </div>
  )
}

export default RoundRanking