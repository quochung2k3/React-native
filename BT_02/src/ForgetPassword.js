import { API_URL } from '@env';  // Lấy URL từ file .env
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeCode, setActiveCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    fetch(`http://172.27.160.1:4000/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.text()) // Fetch the response as text
      .then((text) => {
        if (text === "Success") {
          setOtpSent(true);
          navigation.replace('ResetPassword');
        } else {
          alert('Failed to send OTP');
        }
      })
      .catch((error) => {
        alert('Invalid response from server');
        console.error('Error:', error);
      });
  };  
  
  const handleVerifyOtp = () => {
    const payload = {
      email,
      password,
      activeCode,
    };
  
    fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          if (data.success) {
            alert('Mật khẩu của bạn đã được đặt lại thành công');
            navigation.replace('Login');
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error('Error parsing JSON:', text);
          alert('Invalid response from server');
        }
      })
      .catch((error) => console.error('Error:', error));
  };
  

  return (
    <View style={styles.container}>
      <Text>Quên mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {otpSent ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nhập OTP"
            value={activeCode}
            onChangeText={setActiveCode}
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu mới"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Xác nhận" onPress={handleVerifyOtp} />
        </>
      ) : (
        <Button title="Gửi OTP" onPress={handleSendOtp} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ForgetPassword;