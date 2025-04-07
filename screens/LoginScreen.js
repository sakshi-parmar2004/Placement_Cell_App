import React, { useState } from 'react';
import { View, Image, ToastAndroid, Text , TextInput} from 'react-native';
import { Button } from 'react-native-paper';
import { loginUser } from '../lib/api';

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');

  const handleLogin = async () => {
    const response = await loginUser(id, password);
    if (response != null && response === 'success') {
      navigation.navigate('Dashboard');
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

      <TextInput
        label="Id"
        value={id}
        onChangeText={setId}
        className="mb-4 bg-white border rounded-md"
        placeholder="Enter your ID"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="mb-4 bg-white border rounded-md"
        placeholder="Enter your ID"
     
      />

      <Button mode="contained" onPress={handleLogin} className="mb-4">
        Login
      </Button>

      <Button onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Button>
    </View>
  );
};

export default LoginScreen;
