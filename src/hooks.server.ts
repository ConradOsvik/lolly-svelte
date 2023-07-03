import type { Handle } from '@sveltejs/kit'
import { createTRPCHandle } from 'trpc-sveltekit'

import { createContext } from '$lib/trpc/context'
import { appRouter as router } from '$lib/trpc/router'

export const handle: Handle = createTRPCHandle({
	router,
	createContext,
	responseMeta: () => ({
		headers: { 'cache-control': `s-maxage=1, stale-while-revalidate=${60 * 2}` }
	})
})
