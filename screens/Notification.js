import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator, TouchableOpacity
} from 'react-native';
import Navbar from '../components/Navbar';
import { getMyNotifications } from '../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDistanceToNow } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { markAsRead } from '../lib/api';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleNotificationPress = async (notification) => {
    const userString = await AsyncStorage.getItem('user');
    const user = JSON.parse(userString);
  
    await markAsRead(user._id, notification._id);
  
    navigation.navigate('NoticeDetails', {
      noticeId: notification.notice_id,
    });
  };

  useEffect(() => {
    (async () => {
      const userString = await AsyncStorage.getItem('user');
      const user = JSON.parse(userString);
      const result = await getMyNotifications(user._id);
      setNotifications(result);
      setLoading(false);
    })();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        handleNotificationPress(item)
      }
      className={`p-4 mb-3 rounded-2xl shadow-sm ${
        item.read ? 'bg-gray-200' : 'bg-white'
      }`}
      activeOpacity={0.8}
    >
      <Text
        className={`text-base font-medium ${
          item.read ? 'text-gray-500' : 'text-gray-800'
        }`}
      >
        {item.message}
      </Text>
      <Text className="text-xs text-gray-400 mt-1">
        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <Navbar />
      <View className="px-4 pt-4 flex-1">
        <Text className="text-xl font-bold mb-4 text-gray-800">Notifications</Text>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#4B5563" />
          </View>
        ) : notifications.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-base">No notifications found.</Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default NotificationScreen;
