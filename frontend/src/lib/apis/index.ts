import qs from 'qs';

import { FetchRequest } from '@/types/api';

export class FetchError extends Error {
  constructor(
    response: Response,
    errorMessage = '',
  ) {
    super();
    this.response = response;
    this.message = errorMessage;
  }

  response?: Response;
}

export const paramsSerializer = <T>(params: T): string => qs.stringify(params, {
  arrayFormat: 'comma',
  indices: false,
});

export const getUrl = (url: string) => `${process.env.NEXT_PUBLIC_API_HOST}${url}`;

async function api<T, K = any>({
  url, params, config = {}, headers, method = 'GET',
}: FetchRequest<K>): Promise<T> {
  const response = await fetch(`${getUrl(url)}?${paramsSerializer({
    ...params,
  })}`, {
    ...config,
    headers: {
      ...headers,
      ...(config?.body ? {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      } : {}),
    },
    method,
  });

  if (!response.ok) {
    throw new FetchError(response, response.statusText);
  }

  if (response.status === 204) {
    return null as T;
  }

  const data = await response.json() as Promise<T>;

  return data;
}

export default api;
