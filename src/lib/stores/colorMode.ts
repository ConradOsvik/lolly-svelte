import { browser } from '$app/environment'
import { writable } from 'svelte/store'

const defaultColorMode = 'light'
const localStorageColorMode = browser && localStorage.colorMode
const initialColorMode = localStorageColorMode ? localStorageColorMode : browser ?  window.matchMedia('(prefers-color-scheme: dark)').matches
	? 'dark'
	: 'light'
: defaultColorMode

export const colorMode = writable<string>(initialColorMode)

if(browser) colorMode.subscribe((mode) => localStorage.colorMode = mode)