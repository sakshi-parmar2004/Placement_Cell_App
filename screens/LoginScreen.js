import React, { useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { loginUser } from '../lib/api';




const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');

  const handleLogin = async () => {
      const response = await loginUser(id, password);
      if(response != null && response == "success") {
        navigation.navigate('Dashboard');
        ToastAndroid.show('logged in successfully', ToastAndroid.SHORT);
      }else{
        ToastAndroid.show('Incorrect Id or Password!', ToastAndroid.SHORT);
      }
  };


  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      <Text variant="titleLarge" style={{ marginBottom: 20 }}>Login</Text>
      <TextInput
      label = "Id"
      value={id}
      onChangeText={setId}
      style={{marginBottom : 10}}
      />
      {/* <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ marginBottom: 10 }}
      /> */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={handleLogin}>Login</Button>
      <Button onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 10 }}>
        Don't have an account? Sign Up
      </Button>
    </View>
  );
};

export default LoginScreen;
