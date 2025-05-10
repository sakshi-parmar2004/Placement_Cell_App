import React, { useEffect, useState } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Modal,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCoordinator, setIsCoordinator] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      setIsCoordinator(user.isCoordinator);
    })();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const confirmLogout = async () => {
    setLogoutModalVisible(false);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  const isActive = (screenName) => route.name === screenName;

  return (
    <SafeAreaView style={{ flex: 0, backgroundColor: 'transparent' }}>
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

        {/* <View
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
          <MaterialIcons name="search" size={14} color="#9E9E9E" style={{ marginRight: 8 }} /> */}
          <TouchableOpacity
              onPress={() => navigation.navigate('SearchScreen')}
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
                height: 40,
              }}
            >
            <MaterialIcons name="search" size={14} color="#9E9E9E" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 12, color: '#9E9E9E' }}>
              Search by Name
            </Text>
          </TouchableOpacity>
        {/* </View> */}

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
            onPress={() => setLogoutModalVisible(true)}
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <View
            style={{
              width: 280,
              padding: 20,
              borderRadius: 10,
              backgroundColor: '#fff',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Are you sure?</Text>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
              Do you really want to logout?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <TouchableOpacity
                onPress={() => setLogoutModalVisible(false)}
                style={{
                  flex: 1,
                  padding: 10,
                  marginRight: 10,
                  backgroundColor: '#E0E0E0',
                  borderRadius: 5,
                  alignItems: 'center',
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmLogout}
                style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor: '#FF5252',
                  borderRadius: 5,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#fff' }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Navbar;
