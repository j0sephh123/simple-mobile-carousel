async function fetchWithTimeout<T>(url: string, timeoutMs: number): Promise<T> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(id);
  }
}

export async function fetchJSON<T>(
  url: string,
  timeoutMs = 8000,
  retries = 2,
  backoffMs = 1000
): Promise<T> {
  let lastError: Error | undefined;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fetchWithTimeout<T>(url, timeoutMs);
    } catch (error) {
      lastError = error as Error;
      if (i === retries) break;
      const delay = backoffMs * Math.pow(2, i);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError || new Error(`Failed to fetch ${url}`);
}
