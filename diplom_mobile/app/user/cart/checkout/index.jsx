import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EAppbar from "../../../../components/general/eappbar";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContext } from "expo-router";
import ClothesContext from "../../../../context/clothes_context";
import { formatPrice } from "../../../../utils/format_price";
import { Divider, Modal, Portal, TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import GlobalContext from "../../../../context/global_context";
import { showMessage } from "react-native-flash-message";
import { useIsFocused } from "@react-navigation/native";
import SuccessScreen from "./success_screen";
import UserContext from "../../../../context/user_context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
export default () => {
  const [amounts, setAmounts] = useState({
    total: 0,
    sub_total: 0,
    shipping: 0,
  });
  const [paymentInfo, setPaymentInfo] = useState({
    email: null,
    delivery_address: null,
    phone_number: null,
    card_info: {
      card_number: null,
      firstname: null,
      lastname: null,
      date: null,
      cvv: null,
      epin: null,
    },
  });
  const [visible, setVisible] = useState(false);
  const clCtx = useContext(ClothesContext);
  const glCtx = useContext(GlobalContext);
  const usCtx = useContext(UserContext);
  const router = useRouter();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) init();
  }, [isFocused]);

  const init = async () => {
    glCtx.setLoadingReq(true);
    try {
      await calculateTotal();
      await usCtx.loadLoggedUser();
      glCtx.setLoadingReq(false);
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };
  useEffect(() => {
    setPaymentInfo((prev) => {
      return {
        ...prev,
        email: usCtx.state?.userDetail?.email,
        delivery_address: usCtx.state?.userDetail?.address,
        phone_number: usCtx.state?.userDetail?.phone_number,
      };
    });
  }, [usCtx.state.userDetail]);
  const calculateTotal = async () => {
    let total = 0;

    clCtx.state.cartItems?.map?.((el, i) => {
      total += el.clothes_id.price;
    });

    setAmounts((prev) => {
      return { ...prev, sub_total: total, total: total + 5000 + 6500 };
    });
  };
  const handleSubmit = (e) => {
    if (
      paymentInfo.email &&
      paymentInfo.delivery_address &&
      paymentInfo.phone_number &&
      paymentInfo.card_info.card_number &&
      paymentInfo.card_info.firstname &&
      paymentInfo.card_info.lastname &&
      paymentInfo.card_info.date &&
      paymentInfo.card_info.cvv
    ) {
      setVisible(true);
    } else {
      showMessage({
        message: "талбарыг бүрэн бөглөнө үү!",
        type: "warning",
      });
    }
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 40}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{}}
    >
      <SuccessScreen />
      <ScrollView>
        <View className="">
          <EAppbar
            back
            title="Төлбөр төлөх"
            // onBackPress={() => {
            //   router.navigate("/user/cart");
            // }}
          />
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <View className="w-full flex-col ">
                <View className="flex-row justify-between">
                  <Text>Нийт :</Text>
                  <Text className="text-red-500">
                    {formatPrice(amounts?.total)}
                  </Text>
                </View>
                <Divider />
                <View className="flex-row justify-between">
                  <Text>Email хаяг :</Text>
                  <Text>{paymentInfo?.email}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text>Хүргэлтийн хаяг :</Text>
                  <Text>{paymentInfo.delivery_address}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text>Утасны дугаар:</Text>
                  <Text>{paymentInfo.phone_number}</Text>
                </View>
                <Divider />
                <View className="flex-row justify-between">
                  <Text>Картны дугаар :</Text>
                  <Text>{paymentInfo.card_info.card_number}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text>Нэр :</Text>
                  <Text>{paymentInfo.card_info.firstname}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text>Овог :</Text>
                  <Text>{paymentInfo.card_info.lastname}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text>Картны хүчинтэй хугацаа :</Text>
                  <Text>{paymentInfo.card_info.date}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text>CVV :</Text>
                  <Text>{paymentInfo.card_info.cvv}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text>E-pin :</Text>
                  <Text>{paymentInfo.card_info.epin}</Text>
                </View>
              </View>
              <View className="flex-row justify-center my-2">
                <TouchableOpacity
                  onPress={async () => {
                    setVisible(false);
                    try {
                      glCtx.setLoadingReq(true);
                      clCtx.makeOrder(paymentInfo, amounts);

                      setTimeout(() => {
                        glCtx.setSuccessModal(true);
                        glCtx.setLoadingReq(false);
                        showMessage({
                          message: "Төлбөр амжилттай төлөгдлөө.",
                          type: "success",
                        });
                      }, 2000);

                      setTimeout(() => {
                        glCtx.setSuccessModal(false);
                        router.push("/user");
                      }, 4000);
                    } catch (err) {
                      console.log(err);
                      glCtx.setSuccessModal(false);
                    }
                  }}
                  className="py-2 mx-1 flex-row justify-center  bg-green-500 w-1/2 rounded-md"
                >
                  <Text>Төлөх</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                  }}
                  className="py-2 mx-1 bg-red-400 w-1/2 flex-row justify-center rounded-md"
                >
                  <Text>Болих</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </Portal>

          <View className="flex-col w-full ">
            <View>
              <Text className="text-center text-slate-700 font-semibold text-xl">
                Хүргэлтийн мэдээллэл
              </Text>
            </View>
            <View className="px-2">
              <View className="flex-row justify-between">
                <Text className="font-bold">Суур үнэ</Text>
                <Text>{formatPrice(amounts?.sub_total)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold">Хүргэлт</Text>
                <Text>{formatPrice(amounts?.shipping)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold">Цэвэрлэгээ</Text>
                <Text>{formatPrice("6500")}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold">Уут, Хайрцаг</Text>
                <Text>{formatPrice("5000")}</Text>
              </View>
              <Divider />
              <View className="flex-row justify-between my-2">
                <Text className="font-bold">Нийт</Text>
                <Text className="text-red-500">
                  {formatPrice(amounts?.total)}
                </Text>
              </View>
              <Divider />
            </View>
            <View className="px-2  ">
              <View>
                <TextInput
                  mode="outlined"
                  className="h-10 bg-white "
                  label="1. Email хаяг"
                  value={paymentInfo.email}
                  onChangeText={(text) => {
                    setPaymentInfo((prev) => {
                      return { ...prev, email: text };
                    });
                  }}
                />
              </View>
            </View>
            <View className="px-2">
              <View>
                <TextInput
                  mode="outlined"
                  className="h-10 bg-white  "
                  label="2. Хүргэлтийн хаяг"
                  placeholderTextColor="black"
                  value={paymentInfo.delivery_address}
                  onChangeText={(text) => {
                    setPaymentInfo((prev) => {
                      return { ...prev, delivery_address: text };
                    });
                  }}
                />
              </View>
              <View className="my-2">
                <TextInputMask
                  placeholderTextColor="#3b4a3f"
                  className="h-10 border-[1px] rounded-sm bg-white  px-4 text-base text-black "
                  placeholder="3. Утасны дугаар"
                  type={"custom"}
                  options={{
                    mask: "9999 9999",
                  }}
                  value={paymentInfo.phone_number}
                  onChangeText={(text) => {
                    setPaymentInfo((prev) => {
                      return {
                        ...prev,
                        phone_number: text,
                      };
                    });
                  }}
                />
              </View>
              <View className="my-2">
                <Text className="text-xl font-bold text-slate-700">
                  Картын мэдээлэл
                </Text>
              </View>
              <View>
                <TextInputMask
                  placeholderTextColor="#3b4a3f"
                  className="h-10 border-[1px] rounded-sm px-4 text-base text-black bg-white"
                  placeholder="1. Картын дугаар"
                  type={"credit-card"}
                  options={{
                    mask: "9999 9999 9999 9999",
                  }}
                  value={paymentInfo.card_info.card_number}
                  onChangeText={(text) => {
                    let obj = {
                      ...paymentInfo.card_info,
                      card_number: text,
                    };
                    setPaymentInfo((prev) => {
                      return { ...prev, card_info: obj };
                    });
                  }}
                />
              </View>
              <View>
                <TextInput
                  mode="outlined"
                  className="h-10 bg-white border-black"
                  label="2. Нэр"
                  value={paymentInfo.card_info.firstname}
                  onChangeText={(text) => {
                    let obj = {
                      ...paymentInfo.card_info,
                      firstname: text,
                    };
                    setPaymentInfo((prev) => {
                      return { ...prev, card_info: obj };
                    });
                  }}
                />
              </View>
              <View>
                <TextInput
                  mode="outlined"
                  className="h-10 bg-white border-black"
                  label="3. Овог"
                  value={paymentInfo.card_info.lastname}
                  onChangeText={(text) => {
                    let obj = {
                      ...paymentInfo.card_info,
                      lastname: text,
                    };
                    setPaymentInfo((prev) => {
                      return { ...prev, card_info: obj };
                    });
                  }}
                />
              </View>
              <View className="my-2">
                <TextInputMask
                  placeholderTextColor="#3b4a3f"
                  className="h-10 border-[1px] rounded-sm px-4 text-black text-base  bg-white"
                  placeholder="4. Картын хүчинтэй хугацаа"
                  type={"datetime"}
                  options={{
                    format: "MM/DD",
                  }}
                  value={paymentInfo.card_info.date}
                  onChangeText={(text) => {
                    let obj = {
                      ...paymentInfo.card_info,
                      date: text,
                    };
                    setPaymentInfo((prev) => {
                      return { ...prev, card_info: obj };
                    });
                  }}
                />
              </View>
              <View className="mb-2">
                <TextInputMask
                  placeholderTextColor="#3b4a3f"
                  className="h-10 border-[1px] rounded-sm px-4 text-base text-black bg-white"
                  placeholder="5. CVV"
                  type={"custom"}
                  options={{
                    mask: "999",
                  }}
                  value={paymentInfo.card_info.cvv}
                  onChangeText={(text) => {
                    let obj = {
                      ...paymentInfo.card_info,
                      cvv: text,
                    };
                    setPaymentInfo((prev) => {
                      return { ...prev, card_info: obj };
                    });
                  }}
                />
              </View>
              <View className="">
                <TextInputMask
                  placeholderTextColor="#3b4a3f"
                  className="h-10 border-[1px] rounded-sm px-4 text-base text-black bg-white"
                  placeholder="6. E-pin"
                  type={"custom"}
                  options={{
                    mask: "9999",
                  }}
                  value={paymentInfo.card_info.epin}
                  onChangeText={(text) => {
                    let obj = {
                      ...paymentInfo.card_info,
                      epin: text,
                    };
                    setPaymentInfo((prev) => {
                      return { ...prev, card_info: obj };
                    });
                  }}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    handleSubmit();
                  }}
                  className="bg-slate-700 w-1/2 flex-row justify-center items-center py-2 mt-2 rounded-md "
                >
                  <MaterialIcons name="payments" size={24} color="white" />
                  <Text className="text-white ml-2">Төлбөр төлөх</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const containerStyle = { backgroundColor: "white", padding: 20 };
