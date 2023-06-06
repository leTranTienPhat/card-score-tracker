import { useState } from "react"
import { IPlayer } from "../../../models/playerModel"
import InputField from "../../../components/InputField"

interface IProps {
  player: IPlayer,
  changePlayerName: (playerId: number, newName: string) => void
}

const PlayerName = ({ player, changePlayerName }: IProps) => {
  const { playerId, playerName } = player
  const [currentPlayerName, setCurrentPlayerName] = useState<string>(playerName)

  const onPlayerNameChange = (e: React.FormEvent<HTMLInputElement> | undefined) => {
    if (e) setCurrentPlayerName(e.currentTarget.value)
  }

  const handleChangeName = () => {
    if (!currentPlayerName) setCurrentPlayerName(playerName)
    else changePlayerName(playerId, currentPlayerName)
  }

  return (
    <div className="my-2">
      <InputField value={currentPlayerName} onChange={onPlayerNameChange} onBlur={handleChangeName} />
    </div>
  )
}

export default PlayerName