import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Handle the search query here
    console.log('Searching for:', searchQuery);
  };

  return (
    <View className="flex-row items-center gap-4 bg-blue-500 p-5 my-10">
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search..."
        placeholderTextColor="#888"
        className="flex-1 px-4 py-2 rounded-xl bg-white text-base"
      />
      <TouchableOpacity
        onPress={handleSearch}
        className="p-2 bg-white rounded-xl"
      >
        <MaterialIcons name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
