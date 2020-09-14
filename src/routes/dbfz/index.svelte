<svelte:head>
  <!--link rel='stylesheet' href='https://raw.githack.com/rogueyoshi/dbfz-css/master/demo.css'/-->
  <link rel='stylesheet' href='dbfz/overlay.css'/>
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

  :global(main) {
    display: grid;
    grid-template-areas:
      'game   game   game   game   camera'
      'game   game   game   game   chat  '
      'game   game   game   game   chat  '
      'game   game   game   game   chat  '
      'status status status status input '
    ;
  }

  :global(.game) {
    grid-area: game;
  }

  :global(.camera) {
    grid-area: camera;

  }

  :global(.chat) {
    grid-area: chat;
  }

  :global(.status) {
    grid-area: status;
  }

  :global(.input) {
    grid-area: input;
  }

  .window-inner * {
    margin: 0;
  }

  .bottom-right {
    text-align: right;
  }

  ul {
    list-style-type: none;
    padding-left: 2em;
  }
</style>

<div class='game'></div>
<div class='camera'></div>
<div class='chat'></div>
<div class='input'></div>
<Window class='status'>
  {#if name}<h1 class='dbfz-window-title'>{name}</h1>{/if}
  <div class='window-inner'>
    <ul class='top-right dbfz-color-yellow'>
      <li class='dbfz-selected'>Test</li>
      <li>Test</li>
    </ul>
    {#if status}<p class='bottom-left'>{status}</p>{/if}
    {#if song}<p class='bottom-right'>{song}</p>{/if}
  </div>
</Window>
