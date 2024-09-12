import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('YOUR_API_URL/login', {
        email,
        password,
      });
      if (response.data.success) {
        await AsyncStorage.setItem('token', response.data.token);
        navigation.navigate('Home');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Đăng nhập thất bại!');
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Quên mật khẩu?" onPress={() => navigation.navigate('ForgetPassword')} />
    </View>
  );
};

export default LoginScreen;