<svelte:head>
  <script on:load={onLoad} src='/unity-wc/unity-wc.loader.js'></script>
</svelte:head>

<script>
  import { onMount } from 'svelte';

  export let unityInstance; unityInstance;

  export let onProgress = () => void 0;
  export let onSuccess = () => void 0;
  export let onError = () => void 0;

  let unityReady = false;
  let mountReady = false;
     
  function startUnity() {
    createUnityInstance(
      document.querySelector(`#unity-canvas`),
      {
        dataUrl: "/unity-wc/unity-wc.data",
        frameworkUrl: "/unity-wc/unity-wc.framework.js",
        codeUrl: "/unity-wc/unity-wc.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "rogueyoshi.com",
        productName: "unity-wc",
        productVersion: "0.1",
      },
      onProgress)
      .then(onSuccess)
      .catch(onError);
  };

  function onLoad() {
    // The external Unity javascript is ready
    unityReady = true;
    if (mountReady) {
      startUnity();
    }
  }

  onMount(() => {
    // The canvas is ready
    mountReady = true;
    if (unityReady) {
      startUnity();
    }
  });
</script>

<style>
	#unity-canvas {
		width: 100%;
		height: 100%;
		background: transparent;
	}
</style>

<canvas id="unity-canvas"></canvas>
