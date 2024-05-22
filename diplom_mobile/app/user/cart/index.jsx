import { Feather, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FlatList, Image, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import EAppbar from "../../../components/general/eappbar";
import { TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import ClothesContext from "../../../context/clothes_context";
import { RefreshControl } from "react-native";
import { formatPrice } from "../../../utils/format_price";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useIsFocused } from "@react-navigation/native";
import { truncateText } from "../../../utils/truncate_text";
import { Icon } from "react-native-elements";
export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const [subTotal, setSubTotal] = useState(50000);
  const clCtx = useContext(ClothesContext);
  const router = useRouter();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      init();
    }
  }, [isFocused]);
  useEffect(() => {
    calculateSubTotal();
  }, [clCtx.state.cartItems]);
  const init = async () => {
    await clCtx.loadCartItems();
  };
  const calculateSubTotal = () => {
    let subTotal = clCtx.state.cartItems?.reduce?.((acc, elem) => {
      if (elem?.clothes_id?.price) {
        return acc + elem?.clothes_id?.price;
      } else return acc;
    }, 0);
    setSubTotal(subTotal);
  };
  return (
    <View className="">
      <EAppbar back title="Сагс" />
      <View className="h-full flex-col ">
        <View className="h-4/6 w-full ">
          <FlashList
            ListEmptyComponent={() => (
              <View className="text-center flex-col items-center justify-center gap-4">
                <Text className="text-slate-700 text-lg">
                  Сагс хоосон байна..
                </Text>
                <AntDesign name="isv" size={70} color="black" />
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={async () => {
                  await clCtx.loadCartItems();
                }}
              />
            }
            data={clCtx.state.cartItems ? clCtx.state.cartItems : []}
            renderItem={(elem) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    router.push(
                      `/user/shop/clothes_details/${elem?.item?.clothes_id?._id}`
                    );
                  }}
                >
                  <View className="w-full border-b-[1px] border-slate-300 text-slate-700 flex-1 flex-row justify-between">
                    <View className="w-2/6 h-28">
                      <Image
                        alt=""
                        src={elem?.item?.clothes_id?.images[0]}
                        fill
                        className="h-full object-contain  "
                      />
                    </View>
                    <View className="flex-row justify-between w-4/6 py-1 px-1">
                      <View className="flex-col justify-between items-start">
                        <View>
                          <Text className="w-full font-bold  text-xl">
                            {truncateText(elem.item?.clothes_id?.name)}
                          </Text>
                          <Text className="w-full  text-md text-center  font-bold ml-1  text-slate-400">
                            {formatPrice(elem.item?.clothes_id?.price)}
                          </Text>
                        </View>
                        <TouchableOpacity
                          className="flex flex-row justify-start items-center p-2"
                          onPress={() => {
                            clCtx.removeFromCart(elem?.item?._id);
                          }}
                        >
                          <Ionicons name="bag-remove" size={24} color="red" />
                          <Text className="text-md text-center text-red-500 ml-2">
                            Хасах
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, i) => {
              return i;
            }}
            estimatedItemSize={50}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {clCtx.state?.cartItems && clCtx.state.cartItems?.length != 0 && (
          <View className="h-1/6 ">
            <View className="w-full px-2 flex-row justify-between">
              <Text className="font-bold text-md">Суурь үнэ:</Text>
              <Text className="font-bold text-md text-green-500">
                {formatPrice(subTotal)}
              </Text>
            </View>
            <View className="w-auto flex-row  justify-center my-2   py-2  px-1">
              <TouchableOpacity
                className="w-full  text-center flex-row justify-center items-center bg-slate-700 py-2  px-2 rounded-md"
                onPress={() => {
                  router.navigate("/user/cart/checkout");
                }}
              >
                <MaterialIcons name="payment" size={24} color="white" />
                <Text className="text-white text-lg font-bold ml-2">
                  Төлбөрийн хэсэг
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
