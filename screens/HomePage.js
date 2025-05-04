import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useUserRole } from '../context/AppContext';
import CoordinatorDashboard from './coordinator_profile';
import DashboardScreen from './DashboardScreen'; // Assuming this is the user dashboard component

const HomePage = () => {
  const { isCoordinator } = useUserRole();

  return (
    <View className="flex-1 bg-gray-100 px-4 py-6">
      <View className="flex-1">
        {isCoordinator ? <CoordinatorDashboard /> : <DashboardScreen />}
      </View>
    </View>
  );
};

export default HomePage;
