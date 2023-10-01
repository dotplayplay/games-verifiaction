<script>
import { page } from "$app/stores";
let urlString =    ($page.url.href);
let paramString = urlString.split('?')[1];
let queryString = new URLSearchParams(paramString);
import { onMount } from "svelte";
import axios  from "axios"
import { handleResult } from "./store"

let seaser = []

for (let pair of queryString.entries()) {
    seaser.push(pair[1])
}

let server_seed = seaser[0]
let client_seed = seaser[1]
let none = seaser[2]


const handleFetch = (async()=>{
    try{
        await axios.get(`http://localhost:8000/admin/verify/Verify-dice?s=${server_seed}&c=${client_seed}&me=${none}`)
        .then((res)=>{
            handleResult.set(res.data.result)
        })
    }catch(err){
        alert(err)
    }
})

onMount(async()=>{
    handleFetch()
})
</script>

<div id="app" class="main">
    <h1 class="text-center pb-5">ClassicDice verify</h1>
    <hr>

    <form class="py-5">
        <h2 class="text-center">Input</h2>
        <div class="form-group">
            <input placeholder="Client Seed" bind:value={client_seed} class="form-control">
        </div>
        <div class="form-group">
            <input placeholder="Server Seed" bind:value={server_seed} class="form-control">
        </div>
        <div class="form-group">
            <input placeholder="Server Seed Hash" class="form-control">
        </div>
        <div class="form-group">
            <input placeholder="Nonce" bind:value={none} class="form-control">
        </div>
    </form>

    <hr>

    <form class="py-5">
        <h2 class="text-center pb-5">Output</h2>
        <div class="form-group">
            <div>sha256(server_seed)</div>
            <input readonly value="a356ee6b9467299864e7ccf63233740a386556e2aff3cd2caef0d8f394d35ac3" class="form-control">
        </div> <div class="form-group">
            <div>hmac_sha256(client_seed:nonce, server_seed)</div>
            <input value="36e198595c71d7c874a4c755da91ccc029cccc9fc2bfcfdaa1e04445921c657e" readonly class="form-control">
        </div>
    </form>
    <hr>
    <form class="py-5">
        <h2 class="text-center pb-5">Results</h2>
        <h5>Final Result</h5>
        <h5>hmac_sha256(client_seed:nonce, server_seed)</h5>
        <div class="form-group" style="overflow-x: auto;">
            <table class="table table-sm table-bordered">
                <tbody>
                    <tr>
                        <td class="">12</td>
                        <td class="">d4</td>
                        <td class="">c2</td>
                        <td class="">37</td>
                        <td class="text-muted">7c</td>
                        <td class="text-muted">32</td>
                        <td class="text-muted">77</td>
                        <td class="text-muted">2a</td>
                        <td class="text-muted">91</td>
                        <td class="text-muted">d4</td>
                        <td class="text-muted">be</td>
                        <td class="text-muted">e7</td>
                        <td class="text-muted">3e</td>
                        <td class="text-muted">30</td>
                        <td class="text-muted">37</td>
                        <td class="text-muted">a5</td>
                        <td class="text-muted">36</td>
                        <td class="text-muted">ce</td>
                        <td class="text-muted">94</td>
                        <td class="text-muted">28</td>
                        <td class="text-muted">32</td>
                        <td class="text-muted">2f</td>
                        <td class="text-muted">39</td>
                        <td class="text-muted">b9</td>
                        <td class="text-muted">e1</td>
                        <td class="text-muted">35</td>
                        <td class="text-muted">84</td>
                        <td class="text-muted">8c</td><td class="text-muted">f1</td>
                        <td class="text-muted">e2</td><td class="text-muted">5b</td>
                        <td class="text-muted">a4</td></tr> <tr><td class="">18</td>
                        <td class="">212</td><td class="">194</td>
                        <td class="">55</td><td class="text-muted">124</td>
                        <td class="text-muted">50</td><td class="text-muted">119</td>
                        <td class="text-muted">42</td><td class="text-muted">145</td>
                        <td class="text-muted">212</td><td class="text-muted">190</td>
                        <td class="text-muted">231</td><td class="text-muted">62</td>
                        <td class="text-muted">48</td><td class="text-muted">55</td>
                        <td class="text-muted">165</td><td class="text-muted">54</td>
                        <td class="text-muted">206</td><td class="text-muted">148</td>
                        <td class="text-muted">40</td><td class="text-muted">50</td>
                        <td class="text-muted">47</td><td class="text-muted">57</td>
                        <td class="text-muted">185</td><td class="text-muted">225</td>
                        <td class="text-muted">53</td><td class="text-muted">132</td>
                        <td class="text-muted">140</td><td class="text-muted">241</td>
                        <td class="text-muted">226</td><td class="text-muted">91</td>
                        <td class="text-muted">164</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h5>Bytes to Number</h5>
        <div class="form-group">
            (18, 212, 194, 55) -&gt; [0, ... 4] =
            <span class="text-success">{$handleResult.point}</span>
            <!-- <div><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span> 0.070312500&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>(18 / (256 ^ 1))</span>
            </div>
            <div>
                <span>+&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>0.003234863&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>(212 / (256 ^ 2))</span>
            </div> <div><span>+&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>0.000011563&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>(194 / (256 ^ 3))</span></div>
            <div>
                <span>+&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>0.000000013&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>(55 / (256 ^ 4))</span>
            </div>
            <div>
                <span>=&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>0.073558939&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>(* 10001 / 100)</div>
            <div>
                <span>=&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="text-success">{$handleResult.point}</span>
            </div> -->
        <!-- </div> -->
    </form>
</div>

<style>
.main {
    width: 800px;
    margin: 50px auto;
}
.text-center {
    text-align: center!important;
}
h1 {
    font-size: 2.5rem;
}
.pb-5, .py-5 {
    padding-bottom: 3rem!important;
}
hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
}
hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
}
.text-center {
    text-align: center!important;
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
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.form-group {
    margin-bottom: 1rem;
}
.text-center {
    text-align: center!important;
}
 h5 {
    font-size: 1.25rem;
}
 h1, h2, h5{
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
}
.table-bordered {
    border: 1px solid #dee2e6;
}
.table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
}
.table-bordered td {
    border: 1px solid #dee2e6;
}
.table-sm td {
    padding: 0.3rem;
}
.table td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}
.text-success {
    color: #28a745!important;
}
</style>
