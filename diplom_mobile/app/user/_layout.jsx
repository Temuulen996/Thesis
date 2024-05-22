import { Stack, useRouter } from "expo-router";
import { ClothesWrapper } from "../../context/clothes_context";
import { Drawer } from "expo-router/drawer";
import { Text } from "react-native";
import { Drawer as DrawerPaper } from "react-native-paper";
import { View } from "react-native";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext, { UserWrapper } from "../../context/user_context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
export default () => {
  const router = useRouter();
  const usCtx = useContext(UserContext);
  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userid");
    showMessage({
      message: "Системээс гарлаа.",

      type: "success",
    });
    router.replace("/guest/login");
  };
  return (
    <UserWrapper>
      <ClothesWrapper>
        <Drawer
          initialRouteName="/user/shop"
          screenOptions={{ headerShown: false, drawerStyle: { width: "28%" } }}
          drawerContent={() => {
            return (
              <View className="flex-1 flex-col  w-full h-auto items-center pt-5 justify-end ">
                <DrawerPaper.CollapsedItem
                  focusedIcon={() => (
                    <Entypo name="home" size={24} color="black" />
                  )}
                  unfocusedIcon={() => (
                    <Entypo name="home" size={24} color="black" />
                  )}
                  label="Нүүр"
                  onPress={() => {

                    router.navigate("/user");
                  }}
                />
                <DrawerPaper.CollapsedItem
                  focusedIcon={() => (
                    <Entypo name="shop" size={24} color="black" />
                  )}
                  unfocusedIcon={() => (
                    <Entypo name="shop" size={24} color="black" />
                  )}
                  label="Дэлгүүр"
                  onPress={() => {
                    router.navigate("/user/shop?all=true");
                  }}
                />
                <DrawerPaper.CollapsedItem
                  onPress={() => {
                    router.navigate("/user/profile");
                  }}
                  focusedIcon={() => (
                    <AntDesign name="user" size={24} color="black" />
                  )}
                  unfocusedIcon={() => (
                    <AntDesign name="user" size={24} color="black" />
                  )}
                  label="User"
                />
                <DrawerPaper.CollapsedItem
                  onPress={() => {
                    logOut();
                  }}
                  focusedIcon={() => (
                    <Feather name="log-out" size={24} color="black" />
                  )}
                  unfocusedIcon={() => (
                    <Feather name="log-out" size={24} color="black" />
                  )}
                  label="Гарах"
                />
              </View>
            );
          }}
        />
        {/* <Stack.Screen name="home/screen" />
      <Stack.Screen name="shop/screen" options={{ presentation: "modal" }} /> */}
      </ClothesWrapper>
    </UserWrapper>
  );
};
