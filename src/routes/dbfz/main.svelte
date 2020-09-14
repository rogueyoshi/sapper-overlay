<svelte:head>
  <!--link rel='stylesheet' href='https://raw.githack.com/rogueyoshi/dbfz-css/master/demo.css'/-->
  <link rel='stylesheet' href='overlay.css'/>
</svelte:head>

<script context='module'>
  import { updateFetch } from 'components/api/v0.svelte';

  export async function preload(page, session) {
    updateFetch(this.fetch);
  }
</script>

<script>
  import { getName, getStatus, getSong } from 'components/api/v0.svelte';
  import Window from 'components/dbfz/Window.svelte';

  const pollingRate = 1000;

  let name, updateName, updateNameHandle;

  (updateName = async () => {
    name = await getName();
    updateNameHandle = setTimeout(updateName, pollingRate);
  })();

  let status, updateStatus, updateStatusHandle;

  (updateStatus = async () => {
    status = await getStatus();
    updateStatusHandle = setTimeout(updateStatus, pollingRate);
  })();

  let song, updateSong, updateSongHandle;

  (updateSong = async () => {
    song = await getSong();
    updateSongHandle = setTimeout(updateSong, pollingRate);
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
    width: calc(100% / 3);
  }

  .list {
    position: absolute;
    top: 0;
    right: 0;
    margin: var(--dbfz-window-margin) var(--dbfz-window-margin) 0 0;
    text-align: right;
  }

  .status {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0 0 var(--dbfz-window-margin) var(--dbfz-window-margin);
    text-align: left;
  }

  .song {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0 var(--dbfz-window-margin) var(--dbfz-window-margin) 0;
    text-align: right;
    color: red;
  }

  iframe {
    border: none;
  }

  :global(.dbfz-window) ul {
    list-style-type: none;
    padding-left: 2em;
    color: var(--dbfz-color-yellow);
  }
</style>

<div class='overlay'>
  <div class='game-area'>
  </div>
  <Window class='camera-area dbfz-window-orange'></Window>
  <Window class='chat-area'></Window>
  <Window class='gamepad-area dbfz-window-orange'></Window>
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
