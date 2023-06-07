import { IPlayer } from "../models/playerModel"

interface IProps {
  playerList: IPlayer[],
}


const GameSideEvent = ({ playerList }: IProps) => {
  return (
    <div className="my-10 flex gap-10">
      <div>
        <select name="cars" id="cars">
          {playerList.map(player => {
            return (
              <option key={player.playerId} value={player.playerId}>{player.playerName}</option>
            )
          })}
        </select>
        <input />
      </div>

      <div>
        <select name="cars" id="cars" >
          {playerList.map(player => {
            return (
              <option key={player.playerId} value={player.playerId}>{player.playerName}</option>
            )
          })}
        </select>
        <input />
      </div>

      <textarea className="border-2 border-black" />
    </div>
  )
}

export default GameSideEvent