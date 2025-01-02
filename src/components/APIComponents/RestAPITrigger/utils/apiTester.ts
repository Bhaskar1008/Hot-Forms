import { APIMethod, APIResponse } from '../types';

interface TestAPIParams {
  url: string;
  method: APIMethod;
  headers?: Record<string, string>;
  body?: string;
}

export const testAPI = async ({
  url,
  method,
  headers = {},
  body
}: TestAPIParams): Promise<APIResponse> => {
  try {
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      ...(body && { body })
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    return {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to test API');
  }
};