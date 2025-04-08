import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Using MaterialIcons for better compatibility with React Native

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Add your search logic here
  };

  return (
    <View className="flex-row items-center justify-between bg-blue-200 p-5 my-10 rounded-2xl">
      {/* User Icon */}
      <TouchableOpacity>
        <MaterialIcons name="person" size={25} color="#fff" />
      </TouchableOpacity>

      {/* Search Bar */}
      <TextInput
        className="flex-1 mx-4 bg-white rounded-md px-3 py-2 text-black"
        placeholder="Search by Company Name"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Notification and Logout Icons */}
      <View className="flex-row items-center space-x-4">
        <TouchableOpacity>
          <MaterialIcons name="notifications" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="logout" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;