import Card from "../components/Card"
import { IGame, gameList } from "../models/gameModel.js"
import { convertToKebabCase } from "../utils/smallUtils.js"
import { useNavigate } from "react-router-dom";

const SelectionPage = () => {
  const navigate = useNavigate()

  const onChooseGame = (selectedGame: IGame): void => {
    const kebabName = convertToKebabCase(selectedGame.name)
    navigate(`/config/${kebabName}`, { state: { selectedGame } })
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {gameList.map((game) => {
        return (
          <Card key={game.id} game={game} onClickAction={onChooseGame} />
        )
      })}
    </div>
  )
}

export default SelectionPage