import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import tailwind from 'tailwind-rn';
import axios from 'axios';
import { saveAccountInfo } from '../context/AuthContext';  // Lưu thông tin người dùng vào Realm hoặc tương tự
import { AuthContext } from '../context/AuthContext';      // Sử dụng context để quản lý trạng thái đăng nhập

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);  // Sử dụng context để lưu trạng thái người dùng

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://your-api-url.com/login', {
        username,
        password,
      });

      if (response.data.token) {
        // Lưu thông tin tài khoản và token vào Realm hoặc Local Storage
        saveAccountInfo(username, response.data.token);
        
        // Cập nhật trạng thái người dùng vào Context
        setUser({ username, token: response.data.token });

        // Điều hướng đến HomeScreen sau khi đăng nhập thành công
        navigation.replace('Home');
      } else {
        Alert.alert('Đăng nhập thất bại', 'Vui lòng kiểm tra lại thông tin đăng nhập.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi đăng nhập', 'Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <View style={tailwind('flex-1 justify-center items-center p-4 bg-gray-100')}>
      <Text style={tailwind('text-xl font-bold mb-4')}>Đăng nhập</Text>
      <TextInput
        style={tailwind('border p-2 w-full mb-4')}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={tailwind('border p-2 w-full mb-4')}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;