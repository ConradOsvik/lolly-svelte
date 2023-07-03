import type { RouterOutputs } from "$lib/trpc/router"

export type SummonerData = RouterOutputs['summoner']['get']
export type MatchListData = Exclude<SummonerData['matchList'], undefined>
export type MatchData = MatchListData[0]
export type MatchParticipants = MatchData['MatchParticipants']
export type RankedStatsListData = Exclude<
    SummonerData['rankedStats'],
    undefined
>
export type RankedStatsData = RankedStatsListData[0]