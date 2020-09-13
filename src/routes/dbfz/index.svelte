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
  /* use :global() selector to target Svelte components */

  ul {
    list-style-type: none;
    padding-left: 2em;
  }

  .bottom-right {
    text-align: right;
  }
</style>

<Window>
  {#await name then nameText}<h1 class='dbfz-window-title'>{nameText}</h1>{/await}
  <div class='window-inner'>
    <ul class='top-right dbfz-color-yellow'>
      <li class='dbfz-selected'>Test</li>
      <li>Test</li>
    </ul>
    {#await status then statusText}<p class='bottom-left'>{statusText}</p>{/await}
    {#await song then songText}<p class='bottom-right'>{songText}</p>{/await}
  </div>
</Window>
