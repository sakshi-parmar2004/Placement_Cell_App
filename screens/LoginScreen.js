import React, { useState } from 'react';
import { View, Image, ToastAndroid, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { useUserRole } from '../context/AppContext';

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const {isCoordinator, setIsCoordinator} = useUserRole(); // State to manage coordinator status

  // Function to handle login logic
  const handleLogin = () => {
    // Simple check to navigate to the right page
    
      navigation.navigate('Dashboard');
   

    // You can add your login API request logic here later
    // Example:
    // const response = await loginUser(id, password);
    // if (response != null && response === 'success') {
    //   navigation.navigate(isCoordinator ? 'CoordinatorDashboard' : 'UserDashboard');
    //   ToastAndroid.show('Logged in successfully', ToastAndroid.SHORT);
    // } else {
    //   ToastAndroid.show('Incorrect Id or Password!', ToastAndroid.SHORT);
    // }
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
        placeholder="Enter your Email Id"
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

      {/* Toggle button for Coordinator status */}
      <Button
        mode="outlined"
        onPress={() => setIsCoordinator(!isCoordinator)}
        className="mb-4"
      >
        {isCoordinator ? 'You are a Coordinator' : 'You are a Normal User'}
      </Button>

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
