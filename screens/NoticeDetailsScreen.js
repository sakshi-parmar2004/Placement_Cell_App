import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getNoticeDetails } from '../lib/api';

const { width } = Dimensions.get('window');

const NoticeDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { noticeId } = route.params;
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getNoticeDetails(noticeId);
      setNotice(data);
      setLoading(false);
    })();
  }, [noticeId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      {/* Header Image with Gradient & Title */}
      {/* <View style={{ width, height: 300, position: 'relative' }}>
        <Image
          source={{ uri: notice.notice_url }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        <View style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'flex-end',
          padding: 20,
        }}>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: 'white',
            textShadowColor: 'rgba(0,0,0,0.6)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 6
          }}>
            {notice.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
            left: 20,
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: 10,
            borderRadius: 30,
          }}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View> */}

<View style={{ width: '100%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
  <Image
    source={{ uri: notice.notice_url }}
    style={{ width: width, height: width * 1.2 }} // Adjust height proportionally
    resizeMode="contain"
  />
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={{
      position: 'absolute',
      top: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
      left: 20,
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: 10,
      borderRadius: 30,
    }}
  >
    <Icon name="arrow-back" size={24} color="white" />
  </TouchableOpacity>
</View>


      {/* Info Card */}
      <View style={{
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 16,
        marginTop: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}>
        {[
          { label: 'Company', value: notice.company, icon: 'business' },
          { label: 'Package', value: notice.package, icon: 'briefcase' },
          { label: 'Location', value: notice.location, icon: 'location' },
          { label: 'Last Date', value: notice.last_date_to_apply, icon: 'calendar' },
        ].map((item, idx) => (
          <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
            <Icon name={item.icon} size={20} color="#3B82F6" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 16, color: '#333' }}>
              <Text style={{ fontWeight: '600' }}>{item.label}: </Text>{item.value}
            </Text>
          </View>
        ))}
      </View>

      {/* Optional Description Section */}
      {notice.description ? (
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>📄 Job Description</Text>
          <Text style={{ fontSize: 15, color: '#555', lineHeight: 22 }}>
            {notice.description}
          </Text>
        </View>
      ) : null}

      {/* Apply Button */}
      <TouchableOpacity
        onPress={() => Linking.openURL(notice.apply_link)}
        activeOpacity={0.8}
        style={{
          backgroundColor: '#3B82F6',
          margin: 20,
          paddingVertical: 14,
          borderRadius: 15,
          alignItems: 'center',
          shadowColor: '#3B82F6',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          🚀 Apply Now
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NoticeDetailsScreen;
