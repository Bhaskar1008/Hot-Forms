import { User } from '../types/user';

const API_URL = 'http://localhost:5000/api';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const createUser = async (email: string, role: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, role }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return response.json();
};