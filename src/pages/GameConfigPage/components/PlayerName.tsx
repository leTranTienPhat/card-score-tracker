import { useState } from "react"
import { IPlayer } from "../../../models/playerModel"
import InputField from "../../../components/InputField"

interface IProps {
  player: IPlayer,
  changePlayerName: (playerId: number, newName: string) => void
}

const PlayerName = ({ player, changePlayerName }: IProps) => {
  const { playerId, playerName } = player
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('')

  const onPlayerNameChange = (e: React.FormEvent<HTMLInputElement> | undefined) => {
    if (e) setCurrentPlayerName(e.currentTarget.value)
  }

  const handleChangeName = () => {
    if (!currentPlayerName) changePlayerName(playerId, `Player ${playerId + 1}`)
    else changePlayerName(playerId, currentPlayerName)

    setCurrentPlayerName('')
  }

  return (
    <div>
      <p>{playerName}</p>
      <div>
        <InputField value={currentPlayerName} onChange={onPlayerNameChange} />
        <button className="border-2 border-red-800" onClick={handleChangeName}>Change Name</button>
      </div>
    </div>
  )
}

export default PlayerName