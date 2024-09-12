import Realm from 'realm';

const AccountSchema = {
  name: 'Account',
  properties: {
    email: 'string',
    token: 'string',
  },
};

let realm = new Realm({ schema: [AccountSchema] });

const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post('https://your-api.com/login', {
        email,
        password,
      });
      const { token } = response.data;

      // Lưu thông tin vào Realm
      realm.write(() => {
        realm.create('Account', { email, token });
      });

      return token;
    } catch (error) {
      console.error('Login error', error);
      return null;
    }
  },
};

export default AuthService;