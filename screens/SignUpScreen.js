import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resume, setResume] = useState(null);

  const handleSignUp = () => {
    console.log('Name:', name, 'Email:', email, 'Password:', password, 'Resume:', resume?.uri);
  };

  const pickResume = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (result.assets && result.assets.length > 0) {
        setResume(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Sign Up</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 10 }}
      />
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
      <Button onPress={pickResume} style={{ marginBottom: 10 }} mode="outlined">
        {resume ? "Resume Selected" : "Upload Resume (PDF only)"}
      </Button>
      <Button mode="contained" onPress={handleSignUp}>Sign Up</Button>
      <Button onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>
        Already have an account? Login
      </Button>
    </View>
  );
};

export default SignUpScreen;
