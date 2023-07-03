import type { ISummonerLeague } from 'riot-api-types'
import { z } from 'zod'

import { lolApi } from '$lib/server/lolApi'
import { publicProcedure, router } from '$lib/trpc/t'
import { Platforms } from '$lib/utils/routings'

interface ISummonerLeagueEntries {
	tier: string
	leagueId: string
	queue: string
	name: string
	entries: ISummonerLeague[]
}

export const leagueRouter = router({
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
				leagueId: z.string()
			})
		)
		.query(async (req) => {
			const { leagueId, platform } = req.input

			const data: ISummonerLeagueEntries = await lolApi(
				`https://${Platforms[platform]}/lol/league/v4/leagues/${leagueId}`
			).then((res) => {
				if (res.status !== 200) throw new Error(`${res.statusText}, ${res.status}`)

				return res.json()
			})

			return data
		})
})
