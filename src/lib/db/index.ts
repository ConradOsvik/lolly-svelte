import { Kysely } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'
import type { DB } from './schema'
import { DB_HOST, DB_USERNAME, DB_PASSWORD } from '$env/static/private'

export const db = new Kysely<DB>({
	dialect: new PlanetScaleDialect({
		host: DB_HOST,
		username: DB_USERNAME,
		password: DB_PASSWORD
	})
})
