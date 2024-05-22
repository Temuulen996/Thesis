import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home, Login, Order, Settings, SignUp, Splash } from "./src/screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GlobalProvider } from "./src/context/global_context";
import { ClothesWrapper } from "./src/context/clothes_context";
import { UserWrapper } from "./src/context/user_context";
import FlashMessage from "react-native-flash-message";
import { AntDesign } from "@expo/vector-icons";
import ELoaderScreen from "./src/components/general/loader_screen";
import { PaperProvider } from "react-native-paper";

import { AdminProvider } from "./src/context/admin_context";
import { FontAwesome } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Хувцас+") {
            return <AntDesign name="pluscircleo" size={size} color={color} />;
          } else if (route.name === "Захиалгууд") {
            return <FontAwesome name="reorder" size={size} color={color} />;
          }

          // You can return any component that you like here!
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Хувцас+"
        component={Home}
      />

      <Tab.Screen
        options={{ headerShown: false }}
        name="Захиалгууд"
        component={Order}
      />
    </Tab.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <AdminProvider>
        <GlobalProvider>
          <ClothesWrapper>
            <UserWrapper>
              <PaperProvider>
                <FlashMessage position="center" />

                <ELoaderScreen />
                <Stack.Navigator
                  screenOptions={{ headerShown: false }}
                  initialRouteName="Splash"
                >
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="General"
                    component={Tabs}
                  />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen name="Splash" component={Splash} />
                </Stack.Navigator>
              </PaperProvider>
            </UserWrapper>
          </ClothesWrapper>
        </GlobalProvider>
      </AdminProvider>
    </NavigationContainer>
  );
}
