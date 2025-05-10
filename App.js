import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { initializeApp } from "firebase/app"; // ✅ Web SDK
import { getAuth } from "firebase/auth"; // Import auth if needed
import { UserRoleProvider } from "./context/AppContext";

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import DashboardScreen from "./screens/DashboardScreen";
import NotificationScreen from "./screens/Notification";
import ProfileScreen from "./screens/userprofile";
import CoordinatorProfileScreen from "./screens/coordinator_profile";
import HomePage from "./screens/HomePage";
import EditJobScreen from "./screens/EditScreen";
import SearchScreen from "./screens/SearchScreen";

import "./global.css"; // If you're using Tailwind with NativeWind or CSS via Expo
import NoticeDetailsScreen from "./screens/NoticeDetailsScreen";

// ✅ Firebase config (Web SDK version)
const firebaseConfig = {
  apiKey: "AIzaSyBtJ0k_puXG7qpLbASjAjKlxTnRwwu6gyM",
  authDomain: "final-9f2bd.firebaseapp.com",
  projectId: "final-9f2bd",
  storageBucket: "final-9f2bd.appspot.com",
  messagingSenderId: "882729424249",
  appId: "1:882729424249:android:67cf45fdfa560df4858ba8",
};

// ✅ Initialize Firebase (once)
initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

// ✅ Notification handler setup
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
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received in foreground:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification clicked by user:", response);
      });

    return () => {
      notificationListener.current?.remove(); 
      responseListener.current?.remove();
    };
  }, []);

  return (
    <PaperProvider>
      <UserRoleProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen
              name="coordinator_profile"
              component={CoordinatorProfileScreen}
            />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="userprofile" component={ProfileScreen} />
            <Stack.Screen name="EditJobScreen" component={EditJobScreen} />
            <Stack.Screen name="NoticeDetails" component={NoticeDetailsScreen}/>
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </UserRoleProvider>
    </PaperProvider>
  );
}
