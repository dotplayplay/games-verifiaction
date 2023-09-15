<script>
import {
    useCrashverification
} from "$lib/crashverificationHook"
import {
    previousGamesEl
} from "$lib/store"
import {
    onMount
} from "svelte"
const {
    verifyCrash
} = useCrashverification()

import {
    page
} from '$app/stores'

let hash = ''
let salt = '0000000000000000001b34dc6a1e86083f95500b096231436e9b25cbdd0075c4'
let number = 10

let errrr = ''

const handleSubmit = (() => {
    if (!hash || !salt || !number) {
        errrr = "Feild should not be empty"
    } else {
        let data = {
            hash,
            salt,
            number
        }
        verifyCrash(data)
    }
})

$: {
    onMount(() => {
        hash = $page.url.search.slice(6)
        handleSubmit()
    })
}
</script>

<div class="section">
    <div class="container">
        <h1 class="title">Crash - Game Verification Script</h1>
        <h2 class="subtitle">Third party script used to verify games on crash game.</h2>
    </div>
    <hr>
    <div class="container">
        <p>We made the decision to update Crash using a salted hash as requested by our players in order to provide the most randomized and fair results possible after Bet <span class="has-text-info"># 2561902</span>. For further details, please visit <a target="_blank" href="https://bitcointalk.org/index.php?topic=5256606">https://bitcointalk.org/index.php?topic=5256606</a></p>
    </div>
    <hr>
    <div class="container">
        <div class="field">
            <div class="label">Game's hash</div>
            <p class="control has-icons-left">
                <input class="input" bind:value={hash} type="text" id="game_hash_input" placeholder="Game's hash (SHA256)">
                <span class="icon is-small is-left"><i class="fa fa-key"></i></span>
            </p>
        </div>
        {#if errrr}
        <span class="error-message">{errrr}</span>
        {/if}
        <div class="field">
            <div class="label">Salt</div>
            <p class="control has-icons-left">
                <input class="input" bind:value={salt} type="text" id="game_salt_input" placeholder="Salt">
                <span class="icon is-small is-left"><i class="fa fa-filter"></i></span>
            </p>
        </div>
        <div class="field">
            <div class="label">Amount of games</div>
            <p class="control has-icons-left">
                <input class="input" type="number" id="game_amount_input" min="1" max="100000" step="1" placeholder="Amount of games" bind:value={number}>
                <span class="icon is-small is-left"><i class="fa fa-hashtag"></i></span>
            </p>
        </div>
        <button on:click={handleSubmit} class="field is-grouped">
            <p class="control">
                <a class="button is-primary" id="game_verify_submit">Verify</a>
            </p>
        </button>
    </div>
    <hr>
    <div class="container">
        <table class="table is-striped is-fullwidth is-hoverable is-narrow" style="display:table">
            <thead>
                <tr>
                    <th><b>Game's hash</b></th>
                    <th><b>Bust</b></th>
                </tr>
            </thead>
            <tbody id="game_verify_table">
                {#each $previousGamesEl as ui}
                <tr class="is-first">
                    <td>{ui.hash}</td>
                    <td class={` ${ui.crashpoint < 2 ? "is-under-median" : "is-over-median"} `}>{ui.crashpoint}</td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
.section {
    padding: 3rem 1.5rem;
    display: block;

}

table tbody tr td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.is-under-median {
    color: #BF4A67;
}

.is-over-median {
    color: #44B39D;
}

.is-striped>#game_verify_table .is-first:first-child {
    background-color: rgba(195, 111, 24, 0.2);
}

.table.is-narrow td,
.table.is-narrow th {
    padding: 0.25em 0.5em;
}

.table.is-narrow td,
.table.is-narrow th {
    padding: 0.25em 0.5em;
}

.table td,
.table th {
    border: 1px solid #dbdbdb;
    border-width: 0 0 1px;
    padding: 0.5em 0.75em;
    vertical-align: top;
}

table td,
table th {
    text-align: left;
    vertical-align: top;
}

table tbody tr td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media only screen and (min-width : 1240) {
    .container {
        max-width: 960px;
        width: 960px;
    }
}

.title:not(:last-child) {
    margin-bottom: 1.5rem;
}

.title {
    color: #363636;
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.125;
    width: 100%;
}

.error-message {
    padding: 10px;
    font-size: 17px;
    color: red;
    background-color: rgba(255, 0, 0, 0.192);

}

.subtitle,
.title {
    word-break: break-word;
}

.container {
    margin: 0 auto;
    position: relative;
}

.subtitle {
    color: #4a4a4a;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.25;
}

.subtitle,
.title {
    word-break: break-word;
}

.title:not(.is-spaced)+.subtitle {
    margin-top: -1.5rem;
}

.has-text-info {
    color: #209cee !important;
}

span {
    font-style: inherit;
    font-weight: inherit;
}

a {
    color: #3273dc;
    cursor: pointer;
    text-decoration: none;
}

.field:not(:last-child) {
    margin-bottom: 0.75rem;
}

.label:not(:last-child) {
    margin-bottom: 0.5em;
}

.label {
    color: #363636;
    display: block;
    font-size: 1rem;
    font-weight: 700;
}

.control {
    font-size: 1rem;
    position: relative;
    text-align: left;
}

.input {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 3px;
    -webkit-box-shadow: none;
    box-shadow: none;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 1rem;
    height: 2.25em;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    line-height: 1.5;
    padding-bottom: calc(0.375em - 1px);
    padding-left: calc(0.625em - 1px);
    padding-right: calc(0.625em - 1px);
    padding-top: calc(0.375em - 1px);
    position: relative;
    vertical-align: top;
    background-color: #fff;
    border-color: #dbdbdb;
    color: #363636;
    -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, .1);
    box-shadow: inset 0 1px 2px rgba(10, 10, 10, .1);
    max-width: 100%;
    width: 100%;
}

.control.has-icons-left .icon.is-left {
    left: 0;
}

.control.has-icons-left .icon {
    color: #dbdbdb;
    height: 2.25em;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 2.25em;
    z-index: 4;
}

.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.fa-key:before {
    content: "\f084";
}

hr {
    background-color: #dbdbdb;
    border: none;
    display: block;
    height: 1px;
    margin: 1.5rem 0;
}

.field.is-grouped {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border: none;
    background: none;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
}

.field.is-grouped>.control {
    -ms-flex-negative: 0;
    flex-shrink: 0;
}

.control {
    font-size: 1rem;
    position: relative;
    text-align: left;
}

.button.is-primary {
    background-color: #00d1b2;
    border-color: transparent;
    color: #fff;
}

.button {

    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 3px;
    -webkit-box-shadow: none;
    box-shadow: none;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 1rem;
    height: 2.25em;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    line-height: 1.5;
    padding-bottom: calc(0.375em - 1px);
    padding-left: calc(0.625em - 1px);
    padding-right: calc(0.625em - 1px);
    padding-top: calc(0.375em - 1px);
    position: relative;
    vertical-align: top;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #fff;
    border-color: #dbdbdb;
    color: #363636;
    cursor: pointer;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-left: 0.75em;
    padding-right: 0.75em;
    text-align: center;
    white-space: nowrap;
}

.table.is-fullwidth {
    width: 100%;
}

.table {
    background-color: #fff;
    color: #363636;
    margin-bottom: 1.5rem;
}

table {
    table-layout: fixed;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

.table.is-narrow th {
    padding: 0.25em 0.5em;
}

table thead tr th:first-child {
    width: 80%;
}

.table thead th {
    border-width: 0 0 2px;
    color: #363636;
}

.table th {
    color: #363636;
    text-align: left;
}
</style>
