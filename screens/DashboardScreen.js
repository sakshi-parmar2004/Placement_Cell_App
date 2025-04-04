import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const postsData = [
  {
    id: '1',
    companyName: 'ABC Corp',
    postDetails: 'On-campus placement drive on 10th April 2025',
    pdfUrl: 'https://example.com/job1.pdf',
  },
  {
    id: '2',
    companyName: 'XYZ Ltd',
    postDetails: 'Hiring for Software Engineers on 15th April 2025',
    pdfUrl: 'https://example.com/job2.pdf',
  },
  {
    id: '3',
    companyName: 'Tech Innovations',
    postDetails: 'Placement drive for freshers on 20th April 2025',
    pdfUrl: 'https://example.com/job3.pdf',
  },
];

const DashboardScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(postsData);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = postsData.filter(post =>
      post.companyName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.postDetails}>{item.postDetails}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.pdfUrl)}>
        <Text style={styles.pdfLink}>View Job Details (PDF)</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Icon name="user" size={25} color="#fff" />
        <TextInput
          style={styles.searchBar}
          placeholder="Search by Company Name"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View style={styles.iconsContainer}>
          <Icon name="bell" size={25} color="#fff" />
          <Icon name="sign-out" size={25} color="#fff" />
        </View>
      </View>

      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id}
        renderItem={renderPostItem}
        contentContainerStyle={styles.postList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  navbar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  postList: { padding: 10 },
  postCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  companyName: { fontSize: 18, fontWeight: 'bold' },
  postDetails: { marginTop: 5, fontSize: 14, color: '#555' },
  pdfLink: {
    color: '#1e88e5',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default DashboardScreen;
