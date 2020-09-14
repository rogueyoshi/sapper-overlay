<script context='module'>
  let endpoint = `/api/v0`;
  let fetch;

  function handleError(error) {
    console.warn(error);
  }

  export function updateFetch(newFetch) {
    fetch = newFetch;
  }

  export function updateEndpoint(newEndpoint) {
    endpoint = newEndpoint;
  }

  export async function getName() {
    const res = await fetch(`${endpoint}/name`);
    const name = await res.text();

    if (res.ok) {
      return name;
    }
    else {
      handleError(name);
    }
  }

  export async function getStatus() {
    const res = await fetch(`${endpoint}/status`);
    const status = await res.text();

    if (res.ok) {
      return status;
    }
    else {
      handleError(status);
    }
  }

  export async function getSong() {
    const res = await fetch(`${endpoint}/song`);
    const song = await res.text();

    if (res.ok) {
      return song;
    }
    else {
      handleError(song);
    }
  }
</script>
