import React, { useState } from 'react';
import { View, Image, ToastAndroid, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { loginUser } from '../lib/api';

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');

  // Function to handle login logic
  const handleLogin = async () => {
    if (!id || !password) {
      ToastAndroid.show('Enter all the fields!', ToastAndroid.SHORT);
      return;
    }
  
    // Simple check to navigate to the right page
    const response = await loginUser(id, password);
    if (response != null && response === 'success') {
      // navigation.navigate('Home');\
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
      ToastAndroid.show('Logged in successfully', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Incorrect Id or Password!', ToastAndroid.SHORT);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <View className="flex flex-col items-center mb-8">
        <Image
          source={require('../assets/logo.png')} // Make sure the image exists
          className="w-24 h-24 "
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-gray-800">Login</Text>
      </View>

      {/* User ID Input */}
      <TextInput
        label="Id"
        value={id}
        onChangeText={setId}
        className="mb-4 bg-white border rounded-md"
        placeholder="Enter your Student Id"
      />

      {/* Password Input */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="mb-4 bg-white border rounded-md"
        placeholder="Enter your Password"
      />

      {/* Login Button */}
      <Button mode="contained" onPress={handleLogin} className="mb-4">
        Login
      </Button>

      {/* Sign-up navigation */}
      <Button onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Button>
    </View>
  );
};

export default LoginScreen;
