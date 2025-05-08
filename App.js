import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import { useRef, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import DashboardScreen from './screens/DashboardScreen';
import "./global.css"
import NotificationScreen from './screens/Notification';
import ProfileScreen from './screens/userprofile';
import CoordinatorProfileScreen from './screens/coordinator_profile';
import { UserRoleProvider } from './context/AppContext';
import HomePage from './screens/HomePage';
// in your index.js or App.js (at top)
import { FirebaseApp, initializeApp } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBtJ0k_puXG7qpLbASjAjKlxTnRwwu6gyM",
  authDomain: "final-9f2bd.firebaseapp.com",
  projectId: "final-9f2bd",
  storageBucket: "final-9f2bd.appspot.com",
  messagingSenderId: "882729424249",
  appId: "1:882729424249:android:67cf45fdfa560df4858ba8",
};

initializeApp(firebaseConfig);


const Stack = createNativeStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification received in foreground:", notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification clicked by user:", response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


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
  <Stack.Screen name="Home" component={HomePage} />

</Stack.Navigator>
      </NavigationContainer>
      </UserRoleProvider>
    </PaperProvider>
  );
}
