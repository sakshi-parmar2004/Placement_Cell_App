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
} from 'react-native';
import Navbar from '../components/Navbar';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons';

const CoordinatorProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: 'Jane Doe',
    profileImage: 'https://i.pravatar.cc/300', // Mock image (replace with actual if needed)
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    resumeUrl: 'https://example.com/jane_doe_resume.pdf',
  });

  const [jobTitle, setJobTitle] = useState('');
  const [jobDetails, setJobDetails] = useState('');
  const [pdfUri, setPdfUri] = useState(null);
  const [posts, setPosts] = useState([]);

  // Function to handle the opening of the resume
  const handleOpenResume = async () => {
    const uri = userData.resumeUrl;
    const downloadResumefile = `${FileSystem.documentDirectory}resume.pdf`;

    const downloadRes = await FileSystem.downloadAsync(uri, downloadResumefile);
    if (downloadRes.status === 200 && (await Sharing.isAvailableAsync())) {
      Sharing.shareAsync(downloadRes.uri);
    } else {
      Linking.openURL(uri); // Fallback
    }
  };

  // Handle PDF selection for job post
  const pickPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

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

  // Add a new job post
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

    setPosts([newPost, ...posts]); // Add new post to the list
    setJobTitle('');
    setJobDetails('');
    setPdfUri(null); // Reset form
  };

  // Render each job post
  const renderPostItem = ({ item }) => (
    <View style={{ backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{item.jobTitle}</Text>
      <Text style={{ marginTop: 5, color: '#666' }}>{item.jobDetails}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.pdfUri)}>
        <Text style={{ color: 'blue', marginTop: 10 }}>View Job Details (PDF)</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <Navbar />
      <ScrollView style={{ padding: 20 }}>
        {/* Profile Image */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Image
            source={{ uri: userData.profileImage }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
        </View>

        {/* Name */}
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
          {userData.name}
        </Text>

        {/* Skills */}
        <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold', color: '#333' }}>Skills</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
          {userData.skills.map((skill, index) => (
            <Text key={index} style={{ backgroundColor: '#4CAF50', color: 'white', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, marginRight: 8, marginBottom: 8 }}>
              {skill}
            </Text>
          ))}
        </View>

        {/* Resume Button */}
        <TouchableOpacity onPress={handleOpenResume} style={{ marginTop: 20, backgroundColor: '#007BFF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 5, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>View Resume (PDF)</Text>
        </TouchableOpacity>

        {/* Job Post Form */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 40, marginBottom: 20 }}>
          Post a New Job
        </Text>

        {/* Job Title Input */}
        <TextInput
          placeholder="Enter Job Title"
          style={{ backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 15 }}
          value={jobTitle}
          onChangeText={setJobTitle}
        />

        {/* Job Details Input */}
        <TextInput
          placeholder="Enter Job Details"
          style={{ backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 15 }}
          value={jobDetails}
          onChangeText={setJobDetails}
          multiline
          numberOfLines={3}
        />

        {/* PDF Upload Button */}
        <TouchableOpacity
          onPress={pickPdf}
          style={{
            backgroundColor: '#4CAF50',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="document-attach" size={24} color="white" />
          <Text style={{ color: 'white', marginLeft: 10 }}>Attach PDF</Text>
        </TouchableOpacity>

        {/* Add Job Post Button */}
        <TouchableOpacity
          onPress={handleAddPost}
          style={{
            backgroundColor: '#007BFF',
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 5,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Job Post</Text>
        </TouchableOpacity>

        {/* Display List of Job Posts */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 40, marginBottom: 10 }}>All Job Posts</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPostItem}
        />
      </ScrollView>
    </View>
  );
};

export default CoordinatorProfileScreen;
