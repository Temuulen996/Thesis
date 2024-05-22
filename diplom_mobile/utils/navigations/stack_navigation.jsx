import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Sc from "../../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native";
import { Fragment, useContext } from "react";
import ClothesContext from "../../context/clothes_context";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  // const clCtx = useContext(ClothesContext);
  return (
    <Stack.Navigator initialRouteName="Нүүр">
      <Stack.Screen name="Нэвтрэх" component={Sc.LoginScreen} />
      <Stack.Screen name="Бүртгүүлэх" component={Sc.RegisterScreen} />
      <Stack.Group
        screenOptions={{
          headerStyle: { backgroundColor: "gray" },
          headerTintColor: "white",
          headerTitleStyle: { fontSize: 22 },
        }}
      >
        <Stack.Screen name="Нүүр" component={Sc.HomeScreen} />
        <Stack.Screen name="Хэрэглэгч" component={Sc.ProfileScreen} />
        <Stack.Screen
          name="Дэлгүүр"
          component={Sc.ShopScreen}
          options={{
            headerRight: () => (
              <Button
                title="цэс"
                color="green"
                className="bg-red-400"
                onPress={() => {
                  console.log(clCtx.state);
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Хувцас"
          options={({ route }) => ({
            title: route.params.title,
          })}
          component={Sc.ClothesDetails}
        />
      </Stack.Group>
    </Stack.Navigator>
  );

  // {/* <Tab.Navigator
  //   screenOptions={({ route }) => ({
  //     tabBarActiveTintColor: "#1d191a",
  //     headerShown: false,
  //   })}
  // >
  //   <Tab.Screen
  //     options={{
  //       tabBarLabel: "Нүүр",
  //       tabBarIcon: ({ color, size }) => (
  //         <MaterialIcons name="home" color={color} size={size} />
  //       ),
  //     }}
  //     name="HomeTab"
  //     component={HomeStackNavigator}
  //   />
  //   <Tab.Screen
  //     options={{
  //       tabBarLabel: "Дэлгүүр",
  //       tabBarIcon: ({ color, size }) => (
  //         <MaterialIcons name="shop-2" color={color} size={size} />
  //       ),
  //     }}
  //     name="ShopTab"
  //     component={ShopStackNavigator}
  //   />
  //   <Tab.Screen
  //     options={{
  //       tabBarLabel: "Хэрэглэгч",
  //       tabBarIcon: ({ color, size }) => (
  //         <MaterialIcons name="person-2" color={color} size={size} />
  //       ),
  //     }}
  //     name="ProfileTab"
  //     component={ProfileStackNavigator}
  //   />
  // </Tab.Navigator> */}
};
const LoginRegisterNavigator = () => {
  return <Stack.Navigator></Stack.Navigator>;
};
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "gray" },
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 22 },
      }}
    >
      <Stack.Screen name="Нүүр" component={Sc.HomeScreen} />
      <Stack.Screen name="Нэвтрэх" component={Sc.Login} />
      <Stack.Screen name="Бүртгүүлэх" component={Sc.Register} />
    </Stack.Navigator>
  );
};
const ShopStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "gray" },
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 22 },
      }}
    >
      <Stack.Screen
        name="Дэлгүүр"
        component={Sc.ShopScreen}
        options={{
          headerRight: () => (
            <Button
              title="цэс"
              color="green"
              className="bg-red-400"
              onPress={() => {
                console.log(clCtx.state);
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Хувцас"
        options={({ route }) => ({
          title: route.params.title,
        })}
        component={Sc.ClothesDetails}
      />
    </Stack.Navigator>
  );
};
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "gray" },
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 22 },
      }}
    >
      <Stack.Screen name="Хэрэглэгч" component={Sc.ProfileScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
