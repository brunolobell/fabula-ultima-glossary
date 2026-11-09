import type { EntryType, EntrySummary, EntryWithChildren } from './types';

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

export class ApiError extends Error {
  constructor(readonly status: number) {
    super(`Request failed with status ${status}`);
  }
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new ApiError(res.status);
  }
  return res.json() as Promise<T>;
}

export function fetchEntries(
  search?: string,
  type?: EntryType,
): Promise<EntrySummary[]> {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (type) params.set('type', type);
  const query = params.size > 0 ? `?${params}` : '';
  return request<EntrySummary[]>(`/entries${query}`);
}

export function fetchEntry(slug: string): Promise<EntryWithChildren> {
  return request<EntryWithChildren>(`/entries/${encodeURIComponent(slug)}`);
}
