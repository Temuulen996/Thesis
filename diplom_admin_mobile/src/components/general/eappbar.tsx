import { EvilIcons, Feather } from "@expo/vector-icons";

import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import UserContext from "../../context/user_context";
import ClothesContext from "../../context/clothes_context";
import { AntDesign } from "@expo/vector-icons";
interface EAppbarProps {
  back: boolean;
  logo: boolean;
  title: string;
  cart: boolean;
  logout: boolean;
  onBackPress: () => void;
  navigation: () => void;
}
const EAppbar: React.FC<EAppbarProps> = ({
  back,
  logo,
  title,
  cart,
  logout,
  onBackPress,
  navigation,
}) => {
  const clCtx = useContext(ClothesContext);
  const usCtx = useContext(UserContext);
  return (
    <View>
      <Appbar.Header className="bg-slate-700 h-[50px]">
        {back == true && (
          <Appbar.BackAction
            color="white"
            onPress={() => {
              console.log(navigation);
            }}
          />
        )}
        {logo == true && <Appbar.Content title="Ethrift" color="orange" />}

        <Appbar.Content title={title} color="white" />
        {cart == true && (
          <Appbar.Action
            icon={() => {
              return (
                <View className="flex-1 justify-center items-center">
                  <View className="">
                    <Feather color="white" name="shopping-cart" size={24} />
                    <View className="absolute right-[6px] top-[3px] ">
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
              // navigation.push("user/cart");
              // navigation.openDrawer();
            }}
          />
        )}
        {logout == true && (
          <Appbar.Action
            icon={() => {
              return (
                <View className="flex-1 justify-center items-center">
                  <AntDesign name="logout" size={24} color="white" />
                </View>
              );
            }}
            color="white"
            onPress={() => {
              // navigation.openDrawer();
              usCtx.logOut();
            }}
          />
        )}
      </Appbar.Header>
    </View>
  );
};

export default React.memo(EAppbar);
