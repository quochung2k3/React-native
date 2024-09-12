import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import OtpService from '../services/OtpService';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleRegister = async () => {
    const success = await OtpService.sendOtp(email);
    if (success) {
      setOtpSent(true);
      console.log('OTP sent to email:', email);
    } else {
      console.error('Failed to send OTP');
    }
  };

  return (
    <View>
      <Text>Đăng ký tài khoản</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Gửi OTP" onPress={handleRegister} />
      {otpSent && <Text>OTP đã được gửi đến email của bạn.</Text>}
    </View>
  );
};

export default RegisterScreen;