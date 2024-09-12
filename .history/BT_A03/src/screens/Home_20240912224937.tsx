import React from 'react';
import { View, Text, Button } from 'react-native';
import tailwind from 'tailwind-rn';
import AuthService from '../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken'); // Xóa JWT khi logout
    navigation.replace('Login'); // Điều hướng về màn hình Login
  };

  return (
    <View style={tailwind('flex-1 justify-center items-center')}>
      <Text style={tailwind('text-blue-500 text-lg')}>Chào mừng đến trang chủ</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;