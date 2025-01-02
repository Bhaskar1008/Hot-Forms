import { APIResponse } from '../types';

interface SaveAPIParams {
  name: string;
  response: APIResponse;
  isSuccess: boolean;
  error?: string;
}

export const saveAPIDetails = async (params: SaveAPIParams): Promise<void> => {
  try {
    const apiUrl = '/api/saved-apis';
    const result = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        ...params,
        createdAt: new Date().toISOString()
      })
    });

    if (!result.ok) {
      throw new Error('Failed to save API details');
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to save API details');
  }
};