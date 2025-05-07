import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUserRole } from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // <-- Navigation hook
  const { isCoordinator } = useUserRole(); // Assuming you have a context or prop for user role

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Add your search logic here
  };

  return (
    <View className="flex-row items-center justify-between bg-blue-500 p-5 my-10">
      
      {/* User Icon */}
      <TouchableOpacity
        onPress={() => {
          if (isCoordinator) {
            navigation.navigate('coordinator_profile');
          } else {
            navigation.navigate('userprofile');
          }
        }}
        className="items-center"
      >
        <MaterialIcons name="person" size={25} color="#fff" />
        <Text className="text-white text-xs mt-1">Profile</Text>
      </TouchableOpacity>

      {/* Home Icon */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard')}
        className="items-center"
      >
        <MaterialIcons name="home" size={25} color="#fff" />
        <Text className="text-white text-xs mt-1">Home</Text>
      </TouchableOpacity>

      {/* Search Icon */}
      <TouchableOpacity
        onPress={() => navigation.navigate('search')}
        className="items-center"
      >
        <MaterialIcons name="search" size={25} color="#fff" />
        <Text className="text-white text-xs mt-1">Search</Text>
      </TouchableOpacity>

      {/* Notification Icon */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Notification')}
        className="items-center"
      >
        <MaterialIcons name="notifications" size={25} color="#fff" />
        <Text className="text-white text-xs mt-1">Alerts</Text>
      </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <MaterialIcons name="logout" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
