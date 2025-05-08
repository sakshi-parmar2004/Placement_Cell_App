import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, Linking, Image, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/Navbar';
import { getAllNotices } from '../lib/api';

const DashboardScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const value = await getAllNotices();
      setFilteredPosts(value)
    })();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = postsData.filter(post =>
      post.companyName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const renderPostItem = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-2xl shadow-md border border-gray-200 relative">
  
      {/* User Info */}
      <View className="flex-row items-center mb-3">
        {/* Avatar Circle */}
        <View className="w-8 h-8 rounded-full bg-gray-300 items-center justify-center mr-2">
          <Text className="text-gray-800 font-semibold">
            {item.user?.name?.charAt(0).toUpperCase() || "U"}
          </Text>
        </View>
        <View>
          <Text className="text-sm font-medium text-gray-700">{item.user?.name || "Unknown"}</Text>
          <Text className="text-xs text-gray-500">Student ID: {item.user?.id || "-"}</Text>
        </View>
      </View>
  
      {/* Job Info */}
      <Text className="text-xl font-semibold text-gray-900">{item.title}</Text>
      <Text className="text-base text-gray-700 mt-1">{item.company} • {item.location}</Text>
  
      <View className="flex-row flex-wrap mt-2 space-x-2">
        <Text className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          Package: {item.package}
        </Text>
        <Text className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
          Last Date: {item.last_date_to_apply}
        </Text>
      </View>
  
      <Text className="text-gray-600 mt-3">{item.description || 'No description provided.'}</Text>
  
      <TouchableOpacity
        onPress={() => Linking.openURL(item.notice_url)}
        className="mt-4"
      >
        <Text className="text-blue-600 underline">View Job Notice (Image)</Text>
      </TouchableOpacity>
  
      {item.apply_link && (
        <TouchableOpacity
          onPress={() => Linking.openURL(item.apply_link)}
          className="mt-3 bg-blue-600 rounded-full py-2"
        >
          <Text className="text-center text-white font-medium">Apply Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  

  return (
    <View className="flex-1 bg-gray-100">
      <Navbar />
  
      <FlatList
        data={filteredPosts}
        keyExtractor={(item, index) => item.id?.toString() || `item-${index}`}
        renderItem={renderPostItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default DashboardScreen;
