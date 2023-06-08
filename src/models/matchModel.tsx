import { IPlayer } from "./playerModel"

export interface ISideEvent {
  eventId: string,
  gainScore?: {
    player: IPlayer,
    score: number,
  },
  loseScore?: {
    player: IPlayer[],
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

