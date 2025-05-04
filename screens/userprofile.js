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

const ProfileScreen = () => {
  // Mock data parsed from resume
  const [userData, setUserData] = useState({
    name: 'Jane Doe',
    profileImage:
      'https://i.pravatar.cc/300', // Mock image (replace with actual if needed)
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    resumeUrl: 'https://example.com/jane_doe_resume.pdf',
  });

  const handleOpenResume = async () => {
    const uri = userData.resumeUrl;
    const downloadResumefile = `${FileSystem.documentDirectory}resume.pdf`;

    const downloadRes = await FileSystem.downloadAsync(uri, downloadResumefile);
    if (downloadRes.status === 200 && (await Sharing.isAvailableAsync())) {
      Sharing.shareAsync(downloadRes.uri);
    } else {
      Linking.openURL(uri); // Fallback
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Navbar />
      <ScrollView className="p-6">
        {/* Profile Image */}
        <View className="items-center mb-4">
          <Image
            source={{ uri: userData.profileImage }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
        </View>

        {/* Name */}
        <Text className="text-xl font-bold text-center text-gray-800">
          {userData.name}
        </Text>

        {/* Skills */}
        <Text className="mt-6 text-lg font-semibold text-gray-700">Skills</Text>
        <View className="flex-row flex-wrap mt-2">
          {userData.skills.map((skill, index) => (
            <Text
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2 mb-2"
            >
              {skill}
            </Text>
          ))}
        </View>

        {/* Resume PDF Button */}
        <TouchableOpacity
          onPress={handleOpenResume}
          className="bg-blue-600 mt-8 p-3 rounded-lg items-center"
        >
          <Text className="text-white font-semibold">View Resume (PDF)</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
