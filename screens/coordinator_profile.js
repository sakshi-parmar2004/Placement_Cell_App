import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import { Feather } from "@expo/vector-icons";
import Navbar from '../components/Navbar';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMyPosts, uploadJobNotice } from '../lib/api';
import { ActivityIndicator } from 'react-native';

const CoordinatorProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: 'Jane Doe',
    id: '00000',
    email: 'email@example.com',
    skills: [],
    resumeUrl: 'https://example.com/jane_doe_resume.pdf',
  });
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDetails, setJobDetails] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    (async () => {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setUserData({
          name: user.name,
          id: user.id,
          email: user.email,
          skills: user.skills || [],
          resumeUrl: user.resume,
        });
        setUserId(user._id);
        const postList = await getMyPosts(user._id);
        setPosts(postList)
      }
    })();

  }, []);

  const handleEdit = (item) => {
    // Example: Navigate to edit screen with the post data
    navigation.navigate("EditJobScreen", { post: item });
  };
  

  const handleOpenResume = async () => {
    try {
      const uri = userData.resumeUrl;
      const localUri = `${FileSystem.documentDirectory}resume.pdf`;

      const downloadRes = await FileSystem.downloadAsync(uri, localUri);
      if (downloadRes.status === 200 && (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(downloadRes.uri);
      } else {
        Linking.openURL(uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open resume');
    }
  };

  const pickImage = async () => {
    try {
      Alert.alert('Choose Option', 'Select image from:', [
        {
          text: 'Camera',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            if (!result.canceled) {
              setImageUri(result.assets[0].uri);
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            if (!result.canceled) {
              setImageUri(result.assets[0].uri);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Image selection failed');
    }
  };

  const handleAddPost = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please upload an image.');
      return;
    }
  
    setLoading(true);
  
    try {
      const postPayload = {
        userId,
        title: jobTitle,
        description: jobDetails,
        notice: {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'job_notice.jpg',
        },
      };
  
      const uploadedPost = await uploadJobNotice(postPayload);
      if (!uploadedPost) {
        Alert.alert('Error', 'Failed to upload job post');
        return;
      }
  
      setPosts([uploadedPost, ...posts]);
      setJobTitle('');
      setJobDetails('');
      setImageUri(null);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while uploading');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  const renderPostItem = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-2xl shadow-md border border-gray-200 relative">
      {/* Edit Icon */}
      <TouchableOpacity
        className="absolute top-3 right-3 z-10"
        onPress={() => handleEdit(item)}
      >
        <Feather name="edit-2" size={20} color="#4B5563" />
      </TouchableOpacity>
  
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
  
      <Text className="text-gray-600 mt-3">{item.description}</Text>
  
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
  

  const renderHeader = () => (
    <View className="p-5 bg-white rounded-3xl shadow-md mb-5 mt-5">
      {/* Profile Section */}
      <View className="items-center mb-6">
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          className="w-28 h-28 rounded-full border-4 border-blue-500"
        />
        <Text className="text-2xl font-bold text-gray-800 mt-3">{userData.name}</Text>
        <Text className="text-gray-500 text-base">{userData.email}</Text>
      </View>
  
      {/* Divider */}
      <View className="h-px bg-gray-200 my-4" />
  
      {/* Skills Section */}
      <Text className="text-lg font-semibold text-gray-800 mb-3">Skills</Text>
      <View className="flex-row flex-wrap mb-6">
        {userData.skills.length > 0 ? (
          userData.skills.map((skill, index) => (
            <Text
              key={index}
              className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full mr-2 mb-2 text-sm"
            >
              {skill}
            </Text>
          ))
        ) : (
          <Text className="text-gray-500 italic">No skills added</Text>
        )}
      </View>
  
      {/* Resume Button */}
      <TouchableOpacity
        onPress={handleOpenResume}
        className="bg-blue-600 py-3 rounded-xl items-center mb-8 shadow-sm"
      >
        <Text className="text-white font-semibold text-base">View Resume (PDF)</Text>
      </TouchableOpacity>
  
      {/* Divider */}
      <View className="h-px bg-gray-200 my-4" />
  
      {/* Job Posting Form */}
      <Text className="text-xl font-bold mb-4 text-gray-800">Post a New Job</Text>
      <TextInput
        placeholder="Job Title (optional)"
        value={jobTitle}
        onChangeText={setJobTitle}
        className="bg-gray-100 p-3 rounded-xl mb-4 text-gray-800"
      />
      <TextInput
        placeholder="Job Details (optional)"
        multiline
        value={jobDetails}
        onChangeText={setJobDetails}
        className="bg-gray-100 p-3 rounded-xl mb-4 min-h-[80px] text-gray-800"
      />
      <TouchableOpacity
        onPress={pickImage}
        className="bg-gray-700 flex-row items-center justify-center py-3 rounded-xl mb-5 shadow"
      >
        <Ionicons name="image" size={22} color="white" />
        <Text className="text-white ml-2 font-medium">
          {imageUri ? 'Image Selected' : 'Upload Job Image'}
        </Text>
      </TouchableOpacity>
  
      <TouchableOpacity
        onPress={handleAddPost}
        className={`py-3 rounded-xl items-center mb-4 shadow ${
          loading ? 'bg-gray-400' : 'bg-green-600'
        }`}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white font-bold">Add Job Post</Text>
        )}
      </TouchableOpacity>

      {/* Divider */}
      <View className="h-px bg-gray-200 my-4" />
  
      <Text className="text-xl font-bold mb-2 text-gray-800">All Job Posts</Text>
    </View>
  );
  

  return (
    <View className="flex-1 bg-gray-100">
      <Navbar />
      <FlatList
        ListHeaderComponent={renderHeader}
        data={posts}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={renderPostItem}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        ListEmptyComponent={
          <Text className="text-gray-600 text-center mt-10">No job posts found.</Text>
        }
      />
    </View>
  );
  
  
};

export default CoordinatorProfileScreen;
