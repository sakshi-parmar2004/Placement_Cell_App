import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Keyboard,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { searchQuery } from '../lib/api'; // Adjust path as necessary

const SearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const data = await searchQuery(query.trim());
    setResults(data || []);
    setLoading(false);
  };

  const handleSubmitEditing = () => {
    handleSearch();
    Keyboard.dismiss();
  };

  const handleItemPress = (item) => {
    navigation.navigate('NoticeDetails', { noticeId: item._id });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      {/* Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
          <MaterialIcons name="arrow-back" size={24} color="#5F6368" />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            backgroundColor: '#F5F5F5',
            borderRadius: 25,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}
        >
          <MaterialIcons name="search" size={16} color="#9E9E9E" />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            placeholder="Search by Name"
            style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#424242' }}
            placeholderTextColor="#9E9E9E"
            returnKeyType="search"
            onSubmitEditing={handleSubmitEditing}
          />
        </View>
      </View>

      {/* Search Results */}
      <View style={{ flex: 1, padding: 16 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#6200ee" />
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleItemPress(item)}
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{item.title}</Text>
                <Text style={{ fontSize: 14, color: '#666' }}>{item.company}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>No results found.</Text>}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
