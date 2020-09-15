<script context='module'>
  let endpoint = `/api/v1`;
  let fetch;

  function handleError(error) {
    console.warn(error);
  }

  export function setFetch(newFetch) {
    fetch = newFetch;
  }

  export function updateEndpoint(newEndpoint) {
    endpoint = newEndpoint;
  }

  export async function fetchString(directory, command, query = {}) {
    const queryString = Object.keys(query).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
    }).join('&');

    // TODO: Apply query string
    const res = await fetch(`${endpoint}/${directory}/${command}`);
    const text = await res.text();

    if (res.ok) {
      return text;
    }
    else {
      handleError(text);
    }
  }

  export async function fetchObject(directory, command, query = {}) {
    const queryString = Object.keys(query).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
    }).join('&');

    // TODO: Apply query string
    const res = await fetch(`${endpoint}/${directory}/${command}`);
    const json = await res.json();

    if (res.ok) {
      return json;
    }
    else {
      handleError(json);
    }
  }
</script>
