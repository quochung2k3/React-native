import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const VerifyAccount = ({ route, navigation }) => {
  const { email } = route.params; // Nhận email từ màn hình trước
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = () => {
    const payload = {
      email,   // Sử dụng email đã nhận được
      activeCode: otp,
    };
  
    // Gọi API để xác minh OTP
    fetch(`http://172.27.160.1:4000/api/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.text())  // Nhận phản hồi dưới dạng văn bản
      .then((data) => {
        console.log('Response:', data); // Kiểm tra phản hồi trả về từ API
  
        // Kiểm tra nếu phản hồi chứa chuỗi "Success"
        if (data === 'Success') {
          Alert.alert('Success', 'Successfully!');
          navigation.replace('Login'); // Redirect to login screen after success
        } else {
          Alert.alert('Error', data || 'Something went wrong');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi xác minh OTP. Vui lòng thử lại.");
      });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập mã OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        maxLength={6} // Giới hạn 6 chữ số cho mã OTP
      />
      <Button title="Xác minh OTP" onPress={handleVerifyOtp} />

      {/* Nút để quay lại màn hình đăng nhập */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Quay lại Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  linkText: {
    color: 'blue',
    marginTop: 20,
  },
});

export default VerifyAccount;