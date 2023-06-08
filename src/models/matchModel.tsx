import { IPlayer } from "./playerModel"

export interface ISideEvent {
  eventId: string,
  gainScore?: {
    player: IPlayer,
    amount: number,
  },
  loseScore?: {
    player: IPlayer[],
    amount: number
  },
  note?: string
}

export interface IMatchHistory {
  roundNo: number,
  roundRankingList: Array<number | null>,
  sideEvents: ISideEvent[],
  roundScore: number[]
}

export interface IMatchData {
  matchId: string,
  playerList: IPlayer[],
  currentScore: number[],
  history: IMatchHistory[]
}

export const defaultMatchData: IMatchData = {
  matchId: 'Match 001',
  playerList: [],
  currentScore: [],
  history: []
}