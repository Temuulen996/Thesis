import { EvilIcons, Feather } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import UserContext from "../../context/user_context";
import ClothesContext from "../../context/clothes_context";
import { Icon } from "react-native-elements";
const EAppbar = ({ back, logo, title, cart, drawer, onBackPress }) => {
  const clCtx = useContext(ClothesContext);
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <View className="">
      <Appbar.Header className="bg-slate-700 h-[50px] flex flex-row justify-between items-center">
        <View className="w-1/4 flex flex-row justify-start items-center">
          {back == true && (
            <Appbar.BackAction
              color="white"
              onPress={() => {
                onBackPress ? onBackPress() : router.back();
              }}
            />
          )}
          {logo == true && <Appbar.Content title="Ethrift" color="orange" />}
        </View>
        <Appbar.Content
          className="w-2/4 flex flex-row justify-center items-center"
          title={title}
          color="white"
        />

        <View className="w-1/4 flex flex-row justify-end items-center">
          {cart == true && (
            <Appbar.Action
              icon={() => {
                return (
                  <View className="flex-1 justify-center items-center">
                    <View className="">
                      <Feather color="white" name="shopping-cart" size={24} />
                      <View className="absolute -right-[5px] -top-[4.7px] ">
                        <Text className="text-green-500 font-bold">
                          {clCtx.state.cartTotal == 0
                            ? ""
                            : clCtx.state.cartTotal}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
              color="white"
              onPress={() => {
                router.push("user/cart");
                // navigation.openDrawer();
              }}
            />
          )}
          {drawer == true && (
            <Appbar.Action
              icon={() => {
                return (
                  <View className="flex-1 justify-center items-center">
                    <Icon name="menu" type="material" size={24} color="white" />
                  </View>
                );
              }}
              color="white"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          )}
        </View>
      </Appbar.Header>
    </View>
  );
};

export default React.memo(EAppbar);
