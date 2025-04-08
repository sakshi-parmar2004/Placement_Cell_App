import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, Linking
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../components/Navbar';

const postsData = [
  {
    id: '1',
    companyName: 'ABC Corp',
    postDetails: 'On-campus placement drive on 10th April 2025',
    pdfUrl: 'https://example.com/job1.pdf',
  },
  {
    id: '2',
    companyName: 'XYZ Ltd',
    postDetails: 'Hiring for Software Engineers on 15th April 2025',
    pdfUrl: 'https://example.com/job2.pdf',
  },
  {
    id: '3',
    companyName: 'Tech Innovations',
    postDetails: 'Placement drive for freshers on 20th April 2025',
    pdfUrl: 'https://example.com/job3.pdf',
  },
];

const DashboardScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(postsData);

  useEffect(() => {
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
    <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
      <Text className="text-lg font-semibold text-gray-800">{item.companyName}</Text>
      <Text className="text-sm text-gray-600 mt-1">{item.postDetails}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.pdfUrl)}>
        <Text className="text-blue-600 underline mt-3 text-sm">View Job Details (PDF)</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
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
