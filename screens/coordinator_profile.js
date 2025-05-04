import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import Navbar from '../components/Navbar';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';

const CoordinatorProfileScreen = () => {
  const [userData] = useState({
    name: 'Jane Doe',
    profileImage: 'https://i.pravatar.cc/300',
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    resumeUrl: 'https://example.com/jane_doe_resume.pdf',
  });

  const [jobTitle, setJobTitle] = useState('');
  const [jobDetails, setJobDetails] = useState('');
  const [pdfUri, setPdfUri] = useState(null);
  const [posts, setPosts] = useState([]);

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

  const pickPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });

      if (result.type === 'success') {
        setPdfUri(result.uri);
      } else {
        Alert.alert('Error', 'PDF selection failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to pick the PDF');
    }
  };

  const handleAddPost = () => {
    if (!jobTitle || !jobDetails || !pdfUri) {
      Alert.alert('Error', 'Please fill out all fields and upload a PDF');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      jobTitle,
      jobDetails,
      pdfUri,
    };

    setPosts([newPost, ...posts]);
    setJobTitle('');
    setJobDetails('');
    setPdfUri(null);
  };

  const renderPostItem = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <Text className="text-lg font-bold text-gray-800">{item.jobTitle}</Text>
      <Text className="text-gray-600 mt-1">{item.jobDetails}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.pdfUri)}>
        <Text className="text-blue-600 mt-3">View Job Details (PDF)</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <Navbar />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Profile */}
        <View className="items-center mb-6">
          <Image
            source={{ uri: userData.profileImage }}
            className="w-28 h-28 rounded-full"
          />
          <Text className="text-xl font-bold text-gray-800 mt-3">
            {userData.name}
          </Text>
        </View>

        {/* Skills */}
        <Text className="text-lg font-semibold text-gray-800 mb-3">Skills</Text>
        <View className="flex-row flex-wrap mb-6">
          {userData.skills.map((skill, index) => (
            <Text
              key={index}
              className="bg-blue-500 text-white px-4 py-1 rounded-full mr-2 mb-2"
            >
              {skill}
            </Text>
          ))}
        </View>

        {/* Resume */}
        <TouchableOpacity
          onPress={handleOpenResume}
          className="bg-gray-600 py-3 rounded-md items-center mb-8"
        >
          <Text className="text-white font-semibold">View Resume (PDF)</Text>
        </TouchableOpacity>

        {/* New Job Post */}
        <Text className="text-xl font-bold mb-4 text-gray-800">Post a New Job</Text>

        <TextInput
          placeholder="Job Title"
          value={jobTitle}
          onChangeText={setJobTitle}
          className="bg-white p-3 rounded-md mb-4"
        />

        <TextInput
          placeholder="Job Details"
          multiline
          value={jobDetails}
          onChangeText={setJobDetails}
          className="bg-white p-3 rounded-md mb-4 min-h-[80px] text-gray-700"
        />

        <TouchableOpacity
          onPress={pickPdf}
          className="bg-gray-600 flex-row items-center justify-center py-3 rounded-md mb-5"
        >
          <Ionicons name="document-attach" size={22} color="white" />
          <Text className="text-white ml-2">
            {pdfUri ? 'PDF Selected' : 'Attach PDF'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleAddPost}
          className="bg-blue-500 py-3 rounded-md items-center mb-8"
        >
          <Text className="text-white font-bold">Add Job Post</Text>
        </TouchableOpacity>

        {/* Job Posts */}
        <Text className="text-xl font-bold mb-4 text-gray-800">All Job Posts</Text>

        {posts.length === 0 ? (
          <Text className="text-center text-gray-500 mt-4">No job posts added yet.</Text>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={renderPostItem}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default CoordinatorProfileScreen;
