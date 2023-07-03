import { z } from 'zod'

import { getMatchesFromDB } from '$lib/server/db'
import { publicProcedure, router } from '$lib/trpc/t'

export const matchRouter = router({
	get: publicProcedure
		.input(
			z.object({
				puuid: z.string(),
				take: z.number(),
				skip: z.number()
			})
		)
		.query(async (req) => {
			const { puuid, take, skip } = req.input

			const matchList = await getMatchesFromDB(puuid, take, skip)

			return matchList
		})
})
