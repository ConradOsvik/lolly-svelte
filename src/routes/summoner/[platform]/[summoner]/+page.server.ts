import type { PlatformType } from '$lib/types/routings'

import { createContext } from '$lib/trpc/context'
import { appRouter as router } from '$lib/trpc/router'

import type { PageServerLoad } from './$types'

export const load = (async (event) => {
	const data = await router
		.createCaller(await createContext(event))
		.summoner.get({
			platform: event.params.platform as PlatformType,
			summoner: event.params.summoner
		})

	return data
}) satisfies PageServerLoad
