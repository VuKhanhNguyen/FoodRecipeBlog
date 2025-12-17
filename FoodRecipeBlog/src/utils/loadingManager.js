let count = 0;
const listeners = new Set();

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  for (const l of listeners) l(count);
}

export function increment() {
  count += 1;
  notify();
}

export function decrement() {
  count = Math.max(0, count - 1);
  notify();
}

export function isLoading() {
  return count > 0;
}

export function reset() {
  count = 0;
  notify();
}
