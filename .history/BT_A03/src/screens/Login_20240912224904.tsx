import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AuthService from '../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const token = await AuthService.login(email, password);
    if (token) {
      await AsyncStorage.setItem('userToken', token); // Lưu JWT vào AsyncStorage
      navigation.replace('Home'); // Chuyển hướng tới trang chủ
    } else {
      console.error('Login failed');
    }
  };

  return (
    <View>
      <Text>Đăng nhập</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;