import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView, Text, View } from "react-native";
import UserWrapper from "../context/user_context";
import Toast from "react-native-toast-message";
import FlashMessage from "react-native-flash-message";
import ELoaderScreen from "../components/general/loader_screen";
import { GlobalProvider } from "@/context/global_context";
import { NativeBaseProvider } from "native-base";

import Constants from "expo-constants";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, PRODUCTION_API_URL } from "@/config/config";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
const registerNotificationToken = async (token) => {
  console.log("🚀 ~ registerNotificationToken ~ token:", token);
  try {
    const acc_token = await AsyncStorage.getItem("token");

    console.log(
      `${
        process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
      }/api/notification/token`
    );
    const res = await axios.post(
      `${
        process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
      }/api/notification/token`,
      { token: token?.data },
      {
        headers: { Authorization: `Bearer ${acc_token}` },
      }
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { expoPushToken, notification } = usePushNotifications();
  console.log("🚀 ~ RootLayoutNav ~ expoPushToken:", expoPushToken);
  useEffect(() => {
    registerNotificationToken(expoPushToken);
  }, [expoPushToken]);

  // const data = JSON.stringify(notification, undefined, 2);s
  return (
    <PaperProvider>
      <NativeBaseProvider>
        <GlobalProvider>
          <FlashMessage position="bottom" />
          <ELoaderScreen />
          <Stack screenOptions={{ headerShown: false }} />
        </GlobalProvider>
      </NativeBaseProvider>
    </PaperProvider>
  );
}
