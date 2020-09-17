<svelte:head>
  <script src='/unity-wc/unity-wc.loader.js' on:load={onLoad}></script>
</svelte:head>

<script>
  import { onMount } from 'svelte';

  export let unityInstance; unityInstance;

  export let onProgress = () => void 0;
  export let onSuccess = () => void 0;
  export let onError = () => void 0;


  const onLoad = () => {
    console.log(`onLoad`, process.browser);
    if (process.browser)
    {
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
  }
</script>

<style>
	#unity-canvas {
		width: 100%;
		height: 100%;
		background: transparent;
	}
</style>

<canvas id="unity-canvas"></canvas>
