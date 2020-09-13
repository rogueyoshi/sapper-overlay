<svelte:head>
<link rel="stylesheet" href="https://rogueyoshi.com/dbfz-css/dbfz.css">
  <link rel="stylesheet" href="overlay.css">
</svelte:head>

<script context="module">

</script>

<script>

</script>

<style>
  .content {
    display: grid;
    grid-template-areas:
      "game camera"
      "game chat"
      "status gamepad";
    grid-template-columns: 80% 20%;
    grid-template-rows: 20% 60% 20%;
  }

  .game {
    grid-area: game;
  }

  .status {
    grid-area: status;
  }

  .camera {
    grid-area: camera;
  }

  .chat {
    grid-area: chat;
  }

  .gamepad {
    grid-area: gamepad;
  }

  .dbfz-window .top-left {
    width: calc(100% / 3);
    margin-left: 6px;
    padding-right: 12px;
  }
</style>

<div class="dbfz-text-secondary content">
  <div class="game">
  </div>
  <div class="status dbfz-window">
    <h1 class="top-left dbfz-window-title">rogueyoshi</h1>
    <h4 id="stream-title" class="bottom-left">Testing</h4>
    <h6 class="top-right">
      <div class="dbfz-selected">Free Fighting Game Coaching ➡ rogueyoshi.com/coaching</div>
      <div>Free Stream VoD Archives ➡ rogueyoshi.com/archives</div>
      <div>Support the Stream! ➡ rogueyoshi.com/tip</div>
    </h6>
    <h6 class="bottom-right"><span id="song-title">testr</span>🎶</h6>
  </div>
  <div class="camera dbfz-window dbfz-window-orange">
  </div>
  <div class="chat dbfz-window">
  </div>
  <div class="gamepad dbfz-window dbfz-window-orange">
  </div>
</div>
