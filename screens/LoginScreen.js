import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email, 'Password:', password);
    navigation.navigate('Dashboard');
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      <Text variant="titleLarge" style={{ marginBottom: 20 }}>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ marginBottom: 10 }}
      />
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
