export interface ISideEvent {
  eventId: string,
  gainScore?: {
    playerId: number,
    score: number,
  },
  loseScore?: {
    playerId: number,
    score: number
  },
  note?: string
}

// export interface IMatch {
//   id: number,
//   name: string,
//   maxNumberOfPlayers: number | null,
//   recommendNumberOfPlayer: number
// }

// export const gameList: IMatch[] = [
//   {
//   }
// ]

