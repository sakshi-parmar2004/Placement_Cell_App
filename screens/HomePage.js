import React from 'react';
import { View, Text, Switch } from 'react-native';
import DashboardScreen from './DashboardScreen'; // Assuming this is the user dashboard component

const HomePage = () => {

  return (
    <View className="flex-1 bg-gray-100 ">
      <View className="flex-1">
        <DashboardScreen />
      </View>
    </View>
  );
};

export default HomePage;
