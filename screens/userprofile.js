import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Navbar from '../components/Navbar';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: 'Jane Doe',
    id: '00000',
    email: 'email@example.com',
    isCoordinator: false,
    resume: '',
    date: '',
    skills: [],
  });

  useEffect(() => {
    (async () => {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setUserData({
          name: user.name,
          id: user.id,
          email: user.email,
          isCoordinator: user.isCoordinator,
          resume: user.resume,
          date: user.date,
          skills: user.skills || [],
        });
      }
    })();
  }, []);

  const handleOpenResume = async () => {
    const uri = `http://<your-server-url>/${userData.resume}`;
    const fileUri = `${FileSystem.documentDirectory}resume.pdf`;

    try {
      const downloadRes = await FileSystem.downloadAsync(uri, fileUri);
      if (downloadRes.status === 200 && (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(downloadRes.uri);
      } else {
        Linking.openURL(uri); // fallback
      }
    } catch (error) {
      Linking.openURL(uri); // fallback
    }
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleDateString();
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Navbar />
      <ScrollView className="p-4">
        {/* Profile Card */}
        <View className="bg-white rounded-2xl shadow-md p-6 items-center">
          {/* Avatar */}
          <View className="bg-blue-600 w-24 h-24 rounded-full justify-center items-center mb-4 shadow">
            <Text className="text-white text-3xl font-bold">
              {getInitials(userData.name)}
            </Text>
          </View>

          {/* Name & Role */}
          <Text className="text-xl font-bold text-gray-800">{userData.name}</Text>
          <Text className="text-sm text-gray-500 mb-2">{userData.email}</Text>

          {/* ID & Coordinator Status */}
          <Text className="text-sm text-gray-600">User ID: {userData.id}</Text>
          <Text
            className={`text-sm font-semibold mt-1 ${
              userData.isCoordinator ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {userData.isCoordinator ? 'Placement Coordinator' : 'Student'}
          </Text>
          <Text className="text-xs text-gray-400 mt-1">
            Registered: {formatDate(userData.date)}
          </Text>
        </View>

        {/* Skills Card */}
        <View className="bg-white rounded-2xl shadow-md p-5 mt-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Skills</Text>
          <View className="flex-row flex-wrap">
            {userData.skills.length > 0 ? (
              userData.skills.map((skill, index) => (
                <Text
                key={`${skill}-${index}`}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2 mb-2 text-sm"
                >
                  {skill}
                </Text>
              ))
            ) : (
              <Text className="text-gray-400 text-sm">No skills added yet.</Text>
            )}
          </View>
        </View>

        {/* Resume Button */}
        {userData.resume && (
          <TouchableOpacity
            onPress={handleOpenResume}
            className="bg-blue-600 mt-8 p-3 rounded-xl items-center shadow-md"
          >
            <Text className="text-white font-semibold text-base">
              View Resume (PDF)
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
