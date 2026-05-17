export const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function apiUrl(path: string) {
  return `/api${path}`;
}
