// Shared loader for the country dataset.
// Caches the parsed result in module scope so the data is fetched only once,
// no matter how many hooks/components ask for it.
let cache = null;
let inFlight = null;

export async function fetchCountries() {
  if (cache) return cache;
  if (inFlight) return inFlight;

  inFlight = (async () => {
    const response = await fetch("/data.json");
    if (!response.ok) {
      throw new Error(`Failed to load countries (status ${response.status})`);
    }
    cache = await response.json();
    return cache;
  })();

  try {
    return await inFlight;
  } finally {
    inFlight = null;
  }
}
