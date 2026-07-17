export type IVote = vote[]

export interface vote {
  OptionID: number
  OptionName: string
  Weight: number
  AverageRate: number
  VoteCount: number
}


export interface IRate {
  option: string,
  value: number
}