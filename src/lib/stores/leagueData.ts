import type { SummonerData } from '$lib/types/leagueTypes'
import type { PlatformType } from '$lib/types/routings'

import { readable, writable } from 'svelte/store'

import { browser } from '$app/environment'

export const summonerData = writable<SummonerData>(undefined)

const defaultPlatform = ''
const initialPlatform = browser ? localStorage.platform ?? defaultPlatform : defaultPlatform

export const platform = writable<PlatformType | ''>(initialPlatform)

platform.subscribe((value) => browser && (localStorage.platform = value))

const _patch: string = await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
	.then((res) => res.json())
	.then((data) => data[0])

export const patch = readable<string>(_patch)
