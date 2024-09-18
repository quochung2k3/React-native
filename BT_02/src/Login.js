import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const payload = {
      email,
      password,
    };

    // Gọi API đăng nhập
    fetch('http://172.27.160.1:4000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Lỗi khi đăng nhập');
        }
        return response.json();
      })
      .then(async (data) => {
        console.log('API Response:', data);

        // Kiểm tra nếu API trả về user
        if (data.user) {
          console.log('Đăng nhập thành công', data.user);

          // Lưu trữ thông tin người dùng vào AsyncStorage
          try {
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
          } catch (error) {
            console.error('Failed to save user data:', error);
          }

          // Điều hướng tới TabNavigation sau khi đăng nhập thành công
          navigation.replace('TabNavigation');
        } else {
          Alert.alert('Lỗi', data.message || 'Đăng nhập thất bại');
        }
      })
      .catch((error) => {
        Alert.alert('Lỗi', error.message);
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
      <Button
        title="Quên mật khẩu?"
        onPress={() => navigation.navigate('ForgetPassword')}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  linkText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Login;