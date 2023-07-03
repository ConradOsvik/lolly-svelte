import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { matchRouter } from '$lib/trpc/routes/match'
import { summonerRouter } from '$lib/trpc/routes/summoner'
import { router } from '$lib/trpc/t'

import { leagueRouter } from './routes/league'

export const appRouter = router({
	summoner: summonerRouter,
	match: matchRouter,
	league: leagueRouter
})

export type AppRouter = typeof appRouter
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>
