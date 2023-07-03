import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import {
	getMatchesFromDB,
	getProfileFromDB,
	getRankedStatsFromDB,
	updateMatchesInDB,
	updateProfileInDB,
	updateRankedStatsInDB
} from '$lib/server/db'
import { publicProcedure, router } from '$lib/trpc/t'

export const summonerRouter = router({
	get: publicProcedure
		.input(
			z.object({
				platform: z.enum([
					'euw',
					'eune',
					'russia',
					'turkey',
					'na',
					'las',
					'lan',
					'brazil',
					'oce',
					'korea',
					'japan'
				]),
				summoner: z.string()
			})
		)
		.query(async (req) => {
			const { summoner, platform } = req.input

			let profile = await getProfileFromDB(summoner, platform)

			if (!profile) {
				const updated = await updateProfileInDB(summoner, platform)
				if (!updated)
					throw new TRPCError({
						code: 'NOT_FOUND',
						message: 'Summoner not found'
					})
				profile = await getProfileFromDB(summoner, platform)
			}

			if (profile) {
				const { summonerId, puuid } = profile

				let matchList = await getMatchesFromDB(puuid)
				if (!matchList) {
					await updateMatchesInDB(puuid, platform)
					matchList = await getMatchesFromDB(puuid)
				}

				let rankedStats = await getRankedStatsFromDB(summonerId, platform)
				if (!rankedStats) {
					await updateRankedStatsInDB(summonerId, platform)
					rankedStats = await getRankedStatsFromDB(summonerId, platform)
				}

				return { profile, matchList, rankedStats }
			}

			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Internal server error'
			})
		}),
	update: publicProcedure
		.input(
			z.object({
				platform: z.enum([
					'euw',
					'eune',
					'russia',
					'turkey',
					'na',
					'las',
					'lan',
					'brazil',
					'oce',
					'korea',
					'japan'
				]),
				summoner: z.string()
			})
		)
		.mutation(async (req) => {
			const { summoner, platform } = req.input

			const summonerProfileUpdated = await updateProfileInDB(summoner, platform)

			if (!summonerProfileUpdated)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Summoner profile could not be updated'
				})

			const profile = await getProfileFromDB(summoner, platform)

			if (!profile)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Summoner profile could not be found'
				})

			const { summonerId, puuid } = profile

			await updateMatchesInDB(puuid, platform)
			const matchList = await getMatchesFromDB(puuid)

			await updateRankedStatsInDB(summonerId, platform)
			const rankedStats = await getRankedStatsFromDB(summonerId, platform)

			return {
				profile,
				matchList,
				rankedStats
			}
		})
})
