import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    try {
      const response = await axios.post('YOUR_API_URL/send-otp', { email });
      if (response.data.success) {
        setOtpSent(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Gửi OTP thất bại!');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('YOUR_API_URL/reset-password', {
        email,
        otp,
        newPassword,
      });
      if (response.data.success) {
        alert('Đổi mật khẩu thành công!');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Đổi mật khẩu thất bại!');
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      {otpSent ? (
        <>
          <Text>OTP:</Text>
          <TextInput value={otp} onChangeText={setOtp} />
          <Text>Password mới:</Text>
          <TextInput value={newPassword} onChangeText={setNewPassword} secureTextEntry />
          <Button title="Đổi mật khẩu" onPress={handleResetPassword} />
        </>
      ) : (
        <Button title="Gửi OTP" onPress={sendOtp} />
      )}
    </View>
  );
};

export default ForgetPasswordScreen;