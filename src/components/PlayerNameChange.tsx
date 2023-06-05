import { useState, useEffect } from "react"
import { IPlayer } from "../models/playerModel"

interface IProps {
  player: IPlayer,
  changePlayerName: (playerId: number, newName: string) => void
}

const PlayerNameChange = ({ player, changePlayerName }: IProps) => {
  const { playerId, playerName } = player
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('')

  useEffect(() => {
    setCurrentPlayerName(playerName)
  }, [])

  const onPlayerNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrentPlayerName(e.currentTarget.value)
  }

  const handleChangeName = () => {
    changePlayerName(playerId, currentPlayerName)
  }


  return (
    <div>
      {playerName}
      <div>
        <input className="border-1 bg-red-200 border-red-800 " value={currentPlayerName} onChange={onPlayerNameChange}></input>
        <button className="border-2 border-red-800" onClick={handleChangeName}>Change Name</button>
      </div>
    </div>
  )
}

export default PlayerNameChange