import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('YOUR_API_URL/register', {
        email,
        password,
      });
      if (response.data.success) {
        navigation.navigate('Login');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Đăng ký thất bại!');
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;