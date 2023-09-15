import { writable } from "svelte/store"

let previousGames = []
export let previousGamesEl = writable(previousGames)