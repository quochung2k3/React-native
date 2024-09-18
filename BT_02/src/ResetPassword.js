import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeCode, setActiveCode] = useState('');

  const handleResetPassword = () => {
    // Create payload object based on ResetPasswordDto
    const payload = {
      email,
      password,
      activeCode,
    };
  
    // Call the API to reset password
    fetch('http://172.27.160.1:4000/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.text()) // Dùng response.text() nếu phản hồi không phải JSON
      .then((data) => {
        console.log('Response:', data); // Kiểm tra phản hồi trả về từ API
  
        // Kiểm tra nếu phản hồi chứa chuỗi "Success"
        if (data === 'Success') {
          Alert.alert('Success', 'Password has been reset successfully!');
          navigation.replace('Login'); // Redirect to login screen after success
        } else {
          Alert.alert('Error', data || 'Something went wrong');
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to reset password');
        console.error('Error:', error);
      });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Activation Code"
        value={activeCode}
        onChangeText={setActiveCode}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />

      {/* Optional navigation link to other screens, such as Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Go back to Login</Text>
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
    marginBottom: 20,
    textAlign: 'center',
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

export default ResetPassword;