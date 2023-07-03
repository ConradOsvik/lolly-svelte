import type { PlatformType } from '$lib/types/routings'

import { createContext } from '$lib/trpc/context'
import { appRouter as router } from '$lib/trpc/router'

import type { PageServerLoad } from './$types'

export const load = (async (event) => {
	const data = await router.createCaller(await createContext(event)).league.get({
		platform: event.params.platform as PlatformType,
		leagueId: event.params.leagueId
	})

	return data
}) satisfies PageServerLoad
