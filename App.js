import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/DashboardScreen';

import "./global.css"


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Splash" component={SplashScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="SignUp" component={SignUpScreen} />
  <Stack.Screen name="Dashboard" component={DashboardScreen} />
</Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
