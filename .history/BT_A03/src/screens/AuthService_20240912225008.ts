import axios from 'axios';

const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post('https://your-api.com/login', {
        email,
        password,
      });
      const { token } = response.data; // Nhận token từ API
      return token;
    } catch (error) {
      console.error('Login error', error);
      return null;
    }
  },
};

export default AuthService;