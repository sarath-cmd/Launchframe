/**
 * In-memory abuse guards. They are per server instance: fine for a single
 * Node process, best-effort on serverless. For stricter limits, swap the
 * storage for a shared store (e.g. Redis/Upstash) behind the same functions.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_TRACKED = 5000;

const hits = new Map<string, number[]>();
const completed = new Map<string, number>();

function prune(now: number) {
  if (hits.size > MAX_TRACKED) hits.clear();
  if (completed.size > MAX_TRACKED) completed.clear();
  for (const [id, at] of completed) if (now - at > WINDOW_MS) completed.delete(id);
}

/** Returns true if the caller is over the limit. Records the attempt otherwise. */
export function isRateLimited(key: string, now = Date.now()): boolean {
  prune(now);
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  hits.set(key, [...recent, now]);
  return false;
}

export function wasAlreadySubmitted(submissionId: string): boolean {
  return completed.has(submissionId);
}

export function markSubmitted(submissionId: string, now = Date.now()) {
  completed.set(submissionId, now);
}

export function resetGuards() {
  hits.clear();
  completed.clear();
}
