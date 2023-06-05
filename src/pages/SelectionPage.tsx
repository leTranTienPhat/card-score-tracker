import Card from "../components/Card"
import { gameList } from "../models/gameModels"

const SelectionPage = () => {
  return (
    <div>
      {gameList.map((game) => {
        return (
          <Card key={game.id} game={game} />
        )
      })}
    </div>
  )
}

export default SelectionPage