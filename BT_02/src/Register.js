import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState(true);
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const payload = {
      firstName,
      lastName,
      email,
      dob,
      gender,
      password,
    };
  
    // Gọi API đăng ký
    fetch(`http://172.27.160.1:4000/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.status === 201) {
          // Đăng ký thành công
          return response.json();
        } else {
          // Đăng ký không thành công
          return response.json().then((data) => {
            throw new Error(data.message || 'Đăng ký thất bại');
          });
        }
      })
      .then((data) => {
        // Điều hướng đến màn hình VerifyAccount khi đăng ký thành công và truyền email
        navigation.replace('VerifyAccount', { email: email });
      })
      .catch((error) => {
        // Hiển thị thông báo lỗi khi đăng ký không thành công
        alert(error.message);
      });
  };
  

  return (
    <View style={styles.container}>
      <Text>Đăng ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Họ"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày sinh (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Đăng ký" onPress={handleRegister} />

      {/* Thêm nút để chuyển sang màn hình Đăng nhập */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
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

export default Register;