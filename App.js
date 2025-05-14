import React, { useEffect, useRef } from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { UserRoleProvider } from "./context/AppContext";

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import DashboardScreen from "./screens/DashboardScreen";
import NotificationScreen from "./screens/Notification";
import ProfileScreen from "./screens/userprofile";
import CoordinatorProfileScreen from "./screens/coordinator_profile";
import EditJobScreen from "./screens/EditScreen";
import SearchScreen from "./screens/SearchScreen";
import NoticeDetailsScreen from "./screens/NoticeDetailsScreen";

import "./global.css";

// Firebase config

const Stack = createNativeStackNavigator();

// Notification display rules
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const notificationListener = useRef();
  const responseListener = useRef();

  // ⏺️ Listen to notification interactions
  useEffect(() => {
    // Handle when app is already running
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      if (data.noticeId) {
        navigationRef.navigate("NoticeDetails", { noticeId: data.noticeId });
      }
    });

    // Handle cold start (app killed)
    (async () => {
      const response = await Notifications.getLastNotificationResponseAsync();
      if (response) {
        const data = response.notification.request.content.data;
        if (data.noticeId) {
          navigationRef.navigate("NoticeDetails", { noticeId: data.noticeId });
        }
      }
    })();

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <PaperProvider>
      <UserRoleProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="coordinator_profile" component={CoordinatorProfileScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="userprofile" component={ProfileScreen} />
            <Stack.Screen name="EditJobScreen" component={EditJobScreen} />
            <Stack.Screen name="NoticeDetails" component={NoticeDetailsScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserRoleProvider>
    </PaperProvider>
  );
}
