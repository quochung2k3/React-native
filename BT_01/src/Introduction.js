// src/Introduction.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Introduction = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('HomePage');
    }, 10000); // 10 giây

    return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Xin chào, tôi là Phạm Quốc Hưng, đây là trang giới thiệu bản thân!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Introduction;