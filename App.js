import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/DashboardScreen';

import "./global.css"
import NotificationScreen from './screens/Notification';
import ProfileScreen from './screens/userprofile';
import CoordinatorProfileScreen from './screens/coordinator_profile';
import { UserRoleProvider } from './context/AppContext';
import SearchScreen from './screens/SearchScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
    <UserRoleProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Splash" component={SplashScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="SignUp" component={SignUpScreen} />
  <Stack.Screen name="Dashboard" component={DashboardScreen} />
  <Stack.Screen name="coordinator_profile" component={CoordinatorProfileScreen} />
  <Stack.Screen name="Notification" component={NotificationScreen} />
  <Stack.Screen name="userprofile" component={ProfileScreen} />
  <Stack.Screen name="search" component={SearchScreen} />

</Stack.Navigator>
      </NavigationContainer>
      </UserRoleProvider>
    </PaperProvider>
  );
}
