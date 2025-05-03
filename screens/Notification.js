import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, ScrollView
} from 'react-native';
import Navbar from '../components/Navbar';

// Simulated user profile skills (could come from backend or AsyncStorage)
const userSkills = ['JavaScript', 'React', 'Node.js', 'SQL'];

const postsData = [
  {
    id: '1',
    companyName: 'ABC Corp',
    requiredSkills: ['Java', 'Spring', 'SQL'],
  },
  {
    id: '2',
    companyName: 'XYZ Ltd',
    requiredSkills: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: '3',
    companyName: 'Tech Innovations',
    requiredSkills: ['Python', 'Django', 'PostgreSQL'],
  },
  {
    id: '4',
    companyName: 'CodeWave',
    requiredSkills: ['JavaScript', 'React Native', 'CSS'],
  },
];

const NotificationScreen = () => {
  const [matchingCompanies, setMatchingCompanies] = useState([]);

  useEffect(() => {
    // Filter companies where user's skills match at least one required skill
    const matched = postsData.filter(post =>
      post.requiredSkills.some(skill =>
        userSkills.includes(skill)
      )
    );
    setMatchingCompanies(matched);
  }, []);

  const renderNotificationItem = ({ item }) => (
    <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
      <Text className="text-lg font-semibold text-gray-800">{item.companyName}</Text>
      <Text className="text-sm text-gray-600 mt-1">
        Required Skills: {item.requiredSkills.join(', ')}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <Navbar />
      <View className="px-4 pt-4">
        <Text className="text-xl font-bold text-gray-800 mb-4">Skill-Based Notifications</Text>

        {matchingCompanies.length > 0 ? (
          <FlatList
            data={matchingCompanies}
            keyExtractor={(item) => item.id}
            renderItem={renderNotificationItem}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        ) : (
          <Text className="text-sm text-gray-600">No matching job posts based on your skills.</Text>
        )}
      </View>
    </View>
  );
};

export default NotificationScreen;
