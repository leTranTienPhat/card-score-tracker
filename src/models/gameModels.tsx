export interface IGame {
  id: number,
  name: string,
  maxNumberOfPlayers: number | null,
  recommendNumberOfPlayer?: string
}

export const gameList: IGame[] = [
  {
    id: 1,
    name: "Tiến Lên",
    maxNumberOfPlayers: 4,
    recommendNumberOfPlayer: '4'
  },
  {
    id: 2,
    name: "Bài Cào",
    maxNumberOfPlayers: null,
    recommendNumberOfPlayer: '>3'
  },
  {
    id: 3,
    name: "Catte",
    maxNumberOfPlayers: null,
    recommendNumberOfPlayer: '6'

  },
]