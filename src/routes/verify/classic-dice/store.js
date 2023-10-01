import { writable } from "svelte/store";

let res = ''
export let handleResult = writable(res) 