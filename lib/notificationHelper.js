// notificationHelper.js
//////////////////////////////////////////////////
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import {getDevicePushTokenAsync} from "expo-notifications";
import { Platform } from "react-native";
import axios from "axios";

// - RENDER
// const BASE_URL = "https://server-ep92.onrender.com"
// - WIFI

// const BASE_URL = "http://192.168.31.178:5000";
// - MOBILE
const BASE_URL = "http://192.168.122.109:5000";

export async function registerForPushNotificationsAsync(userId) {
  let token;
  // console.log("inside register for push notification")
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    try {
        // const tokenResponse = await Notifications.getExpoPushTokenAsync({
        //   projectId: "58b98834-65d4-4218-947a-7da0e4713da5",
        // });
        // console.log("Token Response:", tokenResponse);
        // token = tokenResponse.data;
        // const token = await messaging().getToken();
        const tokenResponse = await getDevicePushTokenAsync();
        token = tokenResponse.data;
      } catch (err) {
        console.log("Error fetching push token:", err);
      }

    // Send token to your backend
    const response = await axios.post(`${BASE_URL}/api/update-device-token`, {
      userId,
      device_token: token,
    });
    console.log(response.data);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
}
