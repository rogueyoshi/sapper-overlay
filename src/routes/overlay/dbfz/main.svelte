<svelte:head>
  <link rel='stylesheet' href='dbfz-css/dbfz.css'>
  <link rel='stylesheet' href='overlay.css'/>
</svelte:head>

<script context='module'>
  export async function preload(page, session) {
    const twitchChannel = await (await this.fetch(`/api/twitch/channel`)).json();
    const lastfmTrack = await (await this.fetch(`/api/lastfm/track`)).json();
    return { twitchChannel, lastfmTrack };
  }
</script>
 
<script>
  import { onMount } from 'svelte';
  import Unity from 'components/unity-wc/Unity.svelte';

  const UPDATE_INTERVAL_MS = 5000;

  export let twitchChannel, lastfmTrack;

  $: channelName = twitchChannel.display_name || ``;
  $: channelStatus = twitchChannel.status || ``;
  $: trackArtist = lastfmTrack.artist[`#text`] || ``;
  $: trackName = lastfmTrack.name || ``;

  let updateHandle;

  async function updateLoop() {
    twitchChannel = await (await fetch(`/api/twitch/channel`)).json();
    lastfmTrack = await (await fetch(`/api/lastfm/track`)).json();
    updateHandle = setTimeout(updateLoop, UPDATE_INTERVAL_MS);
  } 

  onMount(updateLoop);
</script>

<style>
  /* Note: You must use the :global() selector to target Svelte components. */

  :global(.game-area) {
    grid-area: game;
  }

  :global(.camera-area) {
    grid-area: camera;

  }

  :global(.chat-area) {
    display: flex;
    grid-area: chat;
  }

  :global(.status-area) {
    grid-area: status;
    position: relative;
  }

  :global(.gamepad-area) {
    grid-area: gamepad;
  }

  .overlay {
    display: grid;
    grid-template-areas:
      "game camera"
      "game chat"
      "status gamepad"
    ;
    grid-template-columns: 80% 20%;
    grid-template-rows: 20% 60% 20%;
  }

  .name {
    max-width: calc(100% / 3);
    font-size: 48px;
  }

  .list {
    position: absolute;
    top: 0;
    right: 0;
    max-width: calc(100% / 3);
    margin: var(--dbfz-window-margin) var(--dbfz-window-margin) 0 0;
    text-align: right;
    font-size: 20px;
  }

  .status {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0 0 var(--dbfz-window-margin) var(--dbfz-window-margin);
    text-align: left;
    font-size: 20px;
  }

  .song {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0 var(--dbfz-window-margin) var(--dbfz-window-margin) 0;
    text-align: right;
    font-size: 20px;
    color: red;
  }

  :global(.dbfz-window) ul {
    list-style-type: none;
    padding-left: 2em;
    color: var(--dbfz-color-yellow);
  }
</style>

<div class='overlay dbfz-text-secondary'>
  <div class='game-area'><Unity/></div>
  <div class='camera-area dbfz-window dbfz-window-orange'/>
  <div class='chat-area dbfz-window'/>
  <div class='gamepad-area dbfz-window dbfz-window-orange'/>
  <div class='status-area dbfz-window'>
    <h1 class='name dbfz-window-title'>{channelName}</h1>
    <ul class='list'>
      <li class="dbfz-selected">Free Fighting Game Coaching ➡ rogueyoshi.com/coaching</li>
      <li>Free Stream VoD Archives ➡ rogueyoshi.com/archives</li>
      <li>Support the Stream! ➡ rogueyoshi.com/tip</li>
    </ul>
    <p class='status'>{channelStatus}</p>
    <p class='song'>{trackName}🎧</p>
  </div>
</div>
