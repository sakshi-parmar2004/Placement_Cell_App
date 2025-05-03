import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';  // For file upload in React Native
import { Ionicons } from '@expo/vector-icons';  // Icon for adding new job post

const Footer = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDetails, setJobDetails] = useState('');
  const [pdfUri, setPdfUri] = useState(null);
  const [posts, setPosts] = useState([]);

  // Function to handle PDF selection
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

  // Function to handle adding a new post
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

    setPosts([newPost, ...posts]); // Adding new post to the list
    setJobTitle('');
    setJobDetails('');
    setPdfUri(null);  // Resetting the form
  };

  // Render each post in the list
  const renderPostItem = ({ item }) => (
    <View style={{ backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{item.jobTitle}</Text>
      <Text style={{ marginTop: 5, color: '#666' }}>{item.jobDetails}</Text>
      <TouchableOpacity
        onPress={() => {
          // Function to open the PDF
          Alert.alert('PDF Open', 'This would open the PDF file');
        }}
      >
        <Text style={{ color: 'blue', marginTop: 10 }}>View Job Details (PDF)</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f8', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Post a New Job</Text>

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

      {/* Add Post Button */}
      <TouchableOpacity
        onPress={handleAddPost}
        style={{
          backgroundColor: '#007BFF',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 5,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Job Post</Text>
      </TouchableOpacity>

      {/* Displaying the List of Posts */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 40, marginBottom: 10 }}>All Job Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
      />
    </View>
  );
};

export default Footer;
