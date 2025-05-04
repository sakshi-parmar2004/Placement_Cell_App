import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // <-- Add this
import { useUserRole } from '../context/AppContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // <-- Navigation hook
  const { isCoordinator } = useUserRole(); // Assuming you have a context or prop for user role

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Add your search logic here
  };

  return (
    <View className="flex-row items-center justify-between  bg-blue-500 p-5 my-10 rounded-2xl">
      {/* User Icon */}
      <TouchableOpacity
  onPress={() => {
    if (isCoordinator) {
      navigation.navigate('coordinator_profile');
    } else {
      navigation.navigate('userprofile'); // Adjust this to your user profile screen
    }
  }}
  className="bg-blue-600 p-3 rounded-full"
>
  

        <MaterialIcons name="person" size={25} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>

        <MaterialIcons name="home" size={25} color="#fff" />
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
        {/* ✅ Navigate to Notifications page on press */}
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <MaterialIcons name="notifications" size={25} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <MaterialIcons name="logout" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
