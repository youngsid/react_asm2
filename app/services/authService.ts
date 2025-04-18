export const register = async (email: string, password: string) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  
    if (!response.ok) {
      throw new Error('Đăng ký thất bại');
    }
  
    return await response.json();
  };
  
  export const login = async (email: string, password: string) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  
    if (!response.ok) {
      throw new Error('Đăng nhập thất bại');
    }
  
    return await response.json();
  };
  