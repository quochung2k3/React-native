import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './Register';
import Login from './Login';
import ForgetPassword from './ForgetPassword';
import HomePage from './HomePage';
import VerifyAccount from './VerifyAccount';
import ResetPassword from './ResetPassword';
import Notification from './Notification';
import PostDetail from './PostDetail';
import Profile from './Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigation cho các màn hình sau khi đăng nhập
const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

// Điều hướng chính
const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mô phỏng trạng thái đăng nhập
  useEffect(() => {
    const checkAuth = async () => {
      // Kiểm tra nếu người dùng đã đăng nhập (ví dụ như kiểm tra token)
      // Giả lập giá trị là `false` cho lúc chưa đăng nhập
      setIsAuthenticated(false);
    };
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        // Điều hướng Tab nếu đã đăng nhập
        <TabNavigation />
      ) : (
        // Điều hướng Stack nếu chưa đăng nhập
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
          {/* Add TabNavigation as a screen */}
          <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;