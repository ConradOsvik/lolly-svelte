import type { Context } from '$lib/trpc/context'
import { initTRPC } from '@trpc/server'
import { transformer } from '$lib/trpc/transformer'

const t = initTRPC.context<Context>().create({
	transformer
})

export const router = t.router

export const publicProcedure = t.procedure
