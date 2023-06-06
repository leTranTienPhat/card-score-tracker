import { IGame } from "../models/gameModel"

interface IProps {
  game: IGame
  onClickAction: (selectedGame: IGame) => void
}

const Card = ({ game, onClickAction }: IProps) => {
  const { name, recommendNumberOfPlayer } = game

  return (
    <div className="w-full h-[200px] p-4">
      <div
        className="flex flex-col justify-center items-center w-full h-full bg-red-200 rounded-lg cursor-pointer"
        onClick={() => onClickAction(game)}
      >
        <h3>{name}</h3>
        <p>({recommendNumberOfPlayer} người chơi)</p>
      </div>
    </div>
  )
}

export default Card