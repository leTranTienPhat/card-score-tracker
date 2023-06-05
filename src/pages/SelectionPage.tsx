import Card from "../components/Card"
import { gameList } from "../models/gameModel.js"
import { convertToKebabCase } from "../utils/smallUtils.js"
import { useNavigate } from "react-router-dom";

const SelectionPage = () => {
  const navigate = useNavigate()

  const onChooseGame = (name: string): void => {
    const kebabName = convertToKebabCase(name)
    navigate(`/config/${kebabName}`)
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