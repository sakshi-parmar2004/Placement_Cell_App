import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, Linking, Image, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/Navbar';

const postsData = [
  {
    id: '1',
    companyName: 'ABC Corp',
    postDetails: 'On-campus placement drive on 10th April 2025',
    pdfUrl: 'https://example.com/job1.pdf',
    jobSummary: 'Role: Software Developer\nLocation: Bangalore\nPackage: ₹6 LPA',
    companyIcon: 'https://via.placeholder.com/50x50.png?text=ABC',
  },
  {
    id: '2',
    companyName: 'XYZ Ltd',
    postDetails: 'Hiring for Software Engineers on 15th April 2025',
    pdfUrl: 'https://example.com/job2.pdf',
    jobSummary: 'Role: Frontend Engineer\nLocation: Remote\nPackage: ₹5 LPA',
    companyIcon: 'https://via.placeholder.com/50x50.png?text=XYZ',
  },
  {
    id: '3',
    companyName: 'Tech Innovations',
    postDetails: 'Placement drive for freshers on 20th April 2025',
    pdfUrl: 'https://example.com/job3.pdf',
    jobSummary: 'Role: QA Tester\nLocation: Pune\nPackage: ₹4.5 LPA',
    companyIcon: 'https://via.placeholder.com/50x50.png?text=TI',
  },
  {
    id: '4',
    companyName: 'Google',
    postDetails: 'Hiring for Software Engineers on 15th April 2025',
    pdfUrl: 'https://example.com/job2.pdf',
    jobSummary: 'Role: Frontend Engineer\nLocation: Remote\nPackage: ₹50 LPA',
    companyIcon: 'https://via.placeholder.com/50x50.png?text=XYZ',
  },
  {
    id: '5',
    companyName: 'Microsoft',
    postDetails: 'Placement drive for freshers on 20th April 2025',
    pdfUrl: 'https://example.com/job3.pdf',
    jobSummary: 'Role: QA Tester\nLocation: Pune\nPackage: ₹40.5 LPA',
    companyIcon: 'https://via.placeholder.com/50x50.png?text=TI',
  },
];

const DashboardScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(postsData);

  useEffect(() => {
    // Uncomment for token retrieval
    // (async () => {
    //   const value = await AsyncStorage.getItem("token");
    //   console.log(value);
    // })();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = postsData.filter(post =>
      post.companyName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const renderPostItem = ({ item }) => (
    <View className="bg-white p-4 rounded-xl mb-4 shadow-sm flex-row">
      <Image
        source={{ uri: item.companyIcon }}
        style={{ width: 50, height: 50, borderRadius: 8, marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text className="text-lg font-semibold text-gray-800">{item.companyName}</Text>
        <Text className="text-sm text-gray-600 mt-1">{item.postDetails}</Text>
        <Text className="text-sm text-gray-700 mt-2">{item.jobSummary}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(item.pdfUrl)}>
          <Text className="text-blue-600 underline mt-3 text-sm">View Job Details (PDF)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <Navbar />
  
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id}
        renderItem={renderPostItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default DashboardScreen;
