import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';

const HomeScreen = () => {
  return (
    <View style={tailwind('flex-1 justify-center items-center bg-gray-200')}>
      <Text style={tailwind('text-lg text-blue-500')}>Trang Chủ</Text>
    </View>
  );
};

export default HomeScreen;
