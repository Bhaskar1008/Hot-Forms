export type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';

export interface APIResponse {
  status: number;
  statusText: string;
  headers?: Record<string, string>;
  data: any;
  timestamp: string;
}

export interface SavedAPIDetails {
  id: string;
  name: string;
  response: APIResponse;
  createdAt: string;
  isSuccess: boolean;
}

export interface TestResult {
  response: APIResponse;
  isSuccess: boolean;
  error?: string;
}