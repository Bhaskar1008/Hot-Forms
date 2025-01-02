export const login = async (email: string, password: string) => {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return response.json();
    };

    export const register = async (email: string, password: string, role: string) => {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      return response.json();
    };

    export const fetchUsers = async () => {
      const response = await fetch('http://localhost:5000/api/users');
      return response.json();
    };
