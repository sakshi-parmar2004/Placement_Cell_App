import React, { useEffect, useState } from 'react';
import { TextInput, View, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const [isCoordinator, setIsCoordinator] = useState(true);

  

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      setIsCoordinator(user.isCoordinator);
    })();
  console.log(route.name)
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  const isActive = (screenName) => route.name === screenName;

  return (
    <SafeAreaView style={{ flex: 0, backgroundColor: 'transparent', width: '100%' }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingHorizontal: 16,
          // paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
          paddingTop: 35,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              if (isCoordinator) {
                navigation.navigate('coordinator_profile');
              } else {
                navigation.navigate('userprofile');
              }
            }}
            style={{
              padding: 8,
              borderRadius: 30,
              backgroundColor: isActive('coordinator_profile') || isActive('userprofile') ? '#D1C4E9' : '#F0F0F0',
            }}
          >
            <MaterialIcons name="person" size={24} color="#5F6368" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Dashboard')}
            style={{
              marginLeft: 20,
              padding: 8,
              borderRadius: 30,
              backgroundColor: isActive('Dashboard') ? '#D1C4E9' : '#F0F0F0',
            }}
          >
            <MaterialIcons name="home" size={24} color="#5F6368" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: 16,
            paddingHorizontal: 16,
            borderRadius: 25,
            backgroundColor: '#F5F5F5',
            flexDirection: 'row',
            alignItems: 'center',
            elevation: 2,
            maxWidth: 400,
          }}
        >
          <MaterialIcons name="search" size={14} color="#9E9E9E" style={{ marginRight: 8 }} />
          <TextInput
            style={{
              flex: 1,
              fontSize: 11,
              color: '#424242',
            }}
            placeholder="Search by name..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={{
              padding: 8,
              borderRadius: 30,
              backgroundColor: isActive('Notification') ? '#D1C4E9' : '#F0F0F0',
            }}
          >
            <MaterialIcons name="notifications" size={24} color="#5F6368" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logoutHandler}
            style={{
              marginLeft: 20,
              padding: 8,
              borderRadius: 30,
              backgroundColor: '#F0F0F0',
            }}
          >
            <MaterialIcons name="logout" size={24} color="#5F6368" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;
