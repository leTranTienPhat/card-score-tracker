import { IGame } from "../models/gameModels"

interface IProps {
  game: IGame
}

const Card = ({ game }: IProps) => {
  const { name } = game

  return (
    <div>{name}</div>
  )
}

export default Card