<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  // @ts-ignore
  import CryptoJS from "crypto-js";
  $: serverSeed = "";
  $: clientSeed = "";
  $: hash = "";
  $: jackpot = "";
  $: numbers = "";

  

  // @ts-ignore
  function getRandomByHash(_hash) {
    return (
      _hash
        .match(/.{2}/g)
        // @ts-ignore
        .map((it) => parseInt(it, 16))
        // @ts-ignore
        .reduce((res, it, i) => res + it / 256 ** (i + 1), 0)
    );
  }

  // @ts-ignore
  function getBalls(_hash) {
    const remainingBalls = Array(36)
      .fill(null)
      // @ts-ignore
      .map((v, i) => i + 1);
    const balls = [];
    for (let i = 0; i < 5; i++) {
      const random = getRandomByHash(_hash.substr(i * 8, 8));
      const ballIndex = Math.floor(random * remainingBalls.length);
      balls.push(remainingBalls.splice(ballIndex, 1)[0]);
    }
    const jackpot =
      Math.floor(getRandomByHash(_hash.substr(5 * 8, 8)) * 10) + 1;
    return balls.concat(jackpot);
  }
  // @ts-ignore
  let timeout = null;
  const handleSeedChange = () => {
    // @ts-ignore
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      const _hash = String(CryptoJS.HmacSHA256(clientSeed, serverSeed));
      const balls = getBalls(_hash);
      numbers = balls.slice(0, 5).join(", ");
      jackpot = balls[5] + "";
      hash = _hash;
    }, 200);
  };

  onMount(() => {
    serverSeed = $page.url.searchParams.get("s") || "";
    clientSeed = $page.url.searchParams.get("c") || "";
    handleSeedChange();
  });
</script>

<div class="main">
  <h1 class="text-center pb-5">Lottery verify</h1>
  <hr />
  <h2 class="text-center">Input</h2>
  <form class="py-5">
    <div class="form-group">
      <input
        class="form-control"
        placeholder="Server Seed"
        on:input={handleSeedChange}
        bind:value={serverSeed}
      />
    </div>
    <div class="form-group">
      <input
        class="form-control"
        placeholder="Client Seed (Hashed)"
        on:input={handleSeedChange}
        bind:value={clientSeed}
      />
    </div>
  </form>
  <h2 class="text-center">Output</h2>
  <form class="py-5">
    <div class="form-group">
      <input
        class="form-control"
        placeholder="HmacSHA256(clientSeed, serverSeed)"
        readonly
        bind:value={hash}
      />
    </div>
    <div class="form-group">
      <input
        class="form-control"
        placeholder="Numbers"
        readonly
        bind:value={numbers}
      />
    </div>
    <div class="form-group">
      <input
        class="form-control"
        placeholder="Jackpot"
        readonly
        bind:value={jackpot}
      />
    </div>
  </form>
</div>

<style>
  * {
    box-sizing: border-box;
  }
  @media screen and (max-width: 800px) {
    .main {
      width: auto;
      margin: 50px 10px;
    }
  }

  .main {
    max-width: 100%;
    padding: 30px;

    width: 800px;
    margin: 50px auto;
  }

  .text-center {
    text-align: center !important;
  }
  .pb-5,
  .py-5 {
    padding-bottom: 3rem !important;
  }
  .form-control:disabled,
  .form-control[readonly] {
    background-color: #e9ecef;
    opacity: 1;
  }
  h1 {
    font-size: 2.5rem;
  }
  h1,
  h2 {
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }
  h1,
  h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
  }
</style>
