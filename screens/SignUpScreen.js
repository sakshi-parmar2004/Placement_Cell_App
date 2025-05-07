import React, { useState } from 'react';
import { View, Text, ToastAndroid, Image , TextInput  } from 'react-native';
import {   Switch ,Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { registerUser } from '../lib/api';
import { useUserRole } from '../context/AppContext';


const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resume, setResume] = useState(null);
  const [id, setId] = useState('');
  // const [isCoordinator, setIsCoordinator] = useState(false);
  const {isCoordinator , setIsCoordinator} = useUserRole();

  const handleSignUp = async () => {
    if (!name || !id || !email || !password || !resume) {
      ToastAndroid.show('Enter all the fields!', ToastAndroid.SHORT);
      return;
    }

    const userData = {
      name,
      id,
      email,
      password,
      isCoordinator,
      resume: {
        uri: resume.uri,
        name: resume.name,
        type: resume.mimeType || 'application/pdf',
      },
    };

    const result = await registerUser(userData);

    if (result && result === 'success') {
      ToastAndroid.show('Registered successfully', ToastAndroid.SHORT);
      navigation.navigate('Dashboard');
    } else {
      ToastAndroid.show('User already exists!', ToastAndroid.SHORT);
    }
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
    <View className="flex px-6 py-8 my-auto">
      <View className=" flex flex-col items-center mb-6">
        <Image
          source={require('../assets/logo.png')}
          className="w-24 h-24"
          resizeMode="contain"
        />
        <Text className="font-bold text-3xl ">Sign Up</Text>
      </View>

      <View className="flex flex-col gap-4">
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          className="bg-white border rounded-md"
          placeholder="Enter your name"
        />
        <TextInput
          label="ID"
          value={id}
          onChangeText={setId}
          className="bg-white border text-black rounded-md"
          placeholder="Enter your ID"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-white border rounded-md"
          placeholder="Enter your email"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="bg-white border rounded-md"
          placeholder="Enter your password"
        />

        <Button
          mode="outlined"
          onPress={pickResume}
          className="border border-gray-400"
        >
          {resume ? 'Resume Selected' : 'Upload Resume (PDF only)'}
        </Button>

        <View className="  flex-row items-center justify-between mt-2">
          <Text className="text-base text-gray-700">Are you a coordinator?</Text>
          <Switch value={isCoordinator} onValueChange={setIsCoordinator} />
        </View>

        <Button
          onPress={handleSignUp}
          mode="contained"
        >
          Sign up
        </Button>

        <Button
          onPress={() => navigation.goBack()}
          className="mt-2"
          labelStyle={{ color: '#1E40AF' }}
        >
          Already have an account? Login
        </Button>
      </View>
    </View>
  );
};

export default SignUpScreen;
