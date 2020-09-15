<svelte:head>
  <!--link rel='stylesheet' href='https://raw.githack.com/rogueyoshi/dbfz-css/master/demo.css'/-->
  <link rel='stylesheet' href='overlay.css'/>
</svelte:head>

<script context='module'>
  import { setFetch } from 'components/api/v1.svelte';

  export async function preload(page, session) {
    setFetch(this.fetch);
  }
</script>

<script>
  import { fetchString, fetchObject } from 'components/api/v1.svelte';
  import Window from 'components/dbfz/v1/Window.svelte';

  const API_POLLING_RATE = 1000;

  let name, updateName, updateNameHandle;

  (updateName = async () => {
    const testQuery = {
      opt1: `test1`,
      opt2: `test2`
    };

    name = await fetchString(`twitch`, `name`, testQuery);
    updateNameHandle = setTimeout(updateName, API_POLLING_RATE);
  })();

  let status, updateStatus, updateStatusHandle;

  (updateStatus = async () => {
    status = await fetchString(`twitch`, `status`);
    updateStatusHandle = setTimeout(updateStatus, API_POLLING_RATE);
  })();

  let song, updateSong, updateSongHandle;

  (updateSong = async () => {
    song = await fetchString(`lastfm`, `song`);
    updateSongHandle = setTimeout(updateSong, API_POLLING_RATE);
  })();
</script>

<style>
  /* Note: You must use the :global() selector to target Svelte components. */

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

<div class='overlay'>
  <div class='game-area'></div>
  <Window class='camera-area dbfz-window-orange'/>
  <Window class='chat-area'/>
  <Window class='gamepad-area dbfz-window-orange'/>
  <Window class='status-area'>
    {#if name}<h1 class='name dbfz-window-title'>{name}</h1>{/if}
    <ul class='list'>
      <li class="dbfz-selected">Free Fighting Game Coaching ➡ rogueyoshi.com/coaching</li>
      <li>Free Stream VoD Archives ➡ rogueyoshi.com/archives</li>
      <li>Support the Stream! ➡ rogueyoshi.com/tip</li>
    </ul>
    {#if status}<p class='status'>{status}</p>{/if}
    {#if song}<p class='song'>{song}🎵</p>{/if}
  </Window>
</div>
