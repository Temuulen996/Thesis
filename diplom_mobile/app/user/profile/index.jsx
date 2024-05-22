import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Image, Text, View } from "react-native";
import EAppbar from "../../../components/general/eappbar";
import UserContext from "../../../context/user_context";
import ClothesContext from "../../../context/clothes_context";
import GlobalContext from "../../../context/global_context";
import AnimateNumber from "react-native-countup";
import {
  AntDesign,
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Modal, Portal, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { formatDate } from "../../../utils/format_date";
import { formatPrice } from "../../../utils/format_price";
import { FormatStatus } from "../../../utils/format_status";
import Ebutton from "../../../components/general/ebutton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, PRODUCTION_API_URL } from "../../../config/config";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import EditModal from "./edit_modal";
const Settings = React.memo(({ label, value, icon }) => {
  return (
    <View className="flex flex-row my-2 justify-start gap-5 items-center">
      <View>{icon}</View>
      <View className="flex flex-col gap-1">
        <Text className="font-bold">{label}</Text>
        <Text className="text-slate-500">{value}</Text>
      </View>
    </View>
  );
});
const CountContainer = ({ count, label }) => {
  return (
    <View className="  w-1/3   h-full    py-1 px-1 ">
      <Text className="text-sm text-center  w-full font-bold">{label}</Text>
      <View className="border-[1px] w-full h-[50px] flex flex-row justify-center items-center rounded-md">
        <AnimateNumber
          value={count}
          timing={(interval, progress) => {
            return interval * (1 - Math.sin(Math.PI * progress)) * 7;
          }}
          countBy={1}
        />
      </View>
    </View>
  );
};
export default () => {
  const [userInfo, setUserInfo] = useState({
    phone_number: null,
    address: null,
    password: null,
  });
  const [summaryData, setSummaryData] = useState({
    totalOrders: {
      label: "Нийт Захиалга",
      digit: 0,
    },

    completeOrders: {
      label: "Амжилттай",
      digit: 0,
    },
    pendingOrders: {
      label: "Хүлээгдэж буй",
      digit: 0,
    },
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const usCtx = useContext(UserContext);
  const clCtx = useContext(ClothesContext);
  const glCtx = useContext(GlobalContext);
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log(usCtx.state.userDetail);
    setUserInfo((prev) => {
      return {
        ...prev,
        phone_number: usCtx.state.userDetail?.phone_number,
        address: usCtx.state.userDetail?.address,
        password: usCtx.state.userDetail?.password,
      };
    });
  }, [usCtx.state.userDetail]);
  useEffect(() => {
    if (isFocused) init();
  }, [isFocused]);
  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };
      const completeOrders = usCtx.state.ordersCurrentUser?.filter?.(
        (order) => {
          return order.status === "Complete";
        }
      );
      const pendingOrders = usCtx.state.ordersCurrentUser?.filter?.((order) => {
        return order.status === "Pending";
      });
      tempData.totalOrders.digit = usCtx.state.ordersCurrentUser?.length;
      tempData.completeOrders.digit = completeOrders?.length;
      tempData.pendingOrders.digit = pendingOrders?.length;
      return tempData;
    });
  }, [usCtx.state.ordersCurrentUser]);

  const init = async () => {
    glCtx.setLoadingReq(true);
    try {
      await usCtx.authorization();
      await usCtx.loadLoggedUser();
      await usCtx.loadOrdersByUser();
      glCtx.setLoadingReq(false);
    } catch (err) {
      glCtx.setLoadingReq(false);
      console.log(err);
    }
  };
  const updateInfo = async () => {
    // if (prevPassword === password) {
    //   toast.error("Хуучин password-той ижил байна.");
    //   return;
    // }
    const token = await AsyncStorage.getItem("token");
    setEditModalVisible(false);
    glCtx.setLoadingReq(true);
    try {
      const data = await axios.post(
        `${
          process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
        }/api/user/update_user_info`,
        {
          password: userInfo.password,
          address: userInfo.address,
          phoneNumber: userInfo.phone_number,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      glCtx.setLoadingReq(false);
      showMessage({
        message: "Мэдээлэл амжилттай солигдлоо.",
        type: "success",
      });
    } catch (err) {
      console.log(err);
      showMessage({
        message: "Амжилтгүй боллоо.",
        type: "danger",
      });
      setEditModalVisible(false);
      glCtx.setLoadingReq(false);
    }
  };

  const summaryKeys = Object.keys(summaryData);
  return (
    <Fragment>
      {usCtx.state.isLogged && (
        <Fragment>
          <EditModal
            editModalVisible={editModalVisible}
            userInfo={userInfo}
            setEditModalVisible={setEditModalVisible}
            setUserInfo={setUserInfo}
            updateInfo={updateInfo}
          />
          <EAppbar logo title="Хэрэглэгч" cart drawer />
          <View className="bg-slate-700 flex flex-row justify-between py-2 px-2 items-start rounded-b-2xl">
            <View className="flex flex-col gap-2 ">
              <Text className="font-bold text-2xl text-white">
                {usCtx.state.userDetail?.fname} {usCtx.state.userDetail?.lname}
              </Text>
              <Text className="text-white text-xl font-semibold">
                {usCtx.state.userDetail?.email}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setEditModalVisible(true);
                }}
              >
                <FontAwesome6 name="edit" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row justify-around  h-auto max-h-[400px]">
            {summaryKeys?.map?.((key) => {
              return (
                <CountContainer
                  key={key}
                  count={summaryData[key]?.digit}
                  label={summaryData[key]?.label}
                />
              );
            })}
          </View>
          <Text className="my-2 mx-2 font-bold text-xl">Хаягийн тохиргоо</Text>
          <View className="py-2 px-2 flex flex-col ">
            <Settings
              icon={
                <MaterialIcons
                  name="drive-file-rename-outline"
                  size={24}
                  color="black"
                />
              }
              label="Нэр"
              value={usCtx.state.userDetail?.fname}
            />
            <Settings
              icon={
                <MaterialCommunityIcons
                  name="rename-box"
                  size={24}
                  color="black"
                />
              }
              label="Овог"
              value={usCtx.state.userDetail?.lname}
            />
            <Settings
              icon={<Entypo name="email" size={24} color="black" />}
              label="Email хаяг"
              value={usCtx.state.userDetail?.email}
            />
            <Settings
              icon={<AntDesign name="phone" size={24} color="black" />}
              label="Утасны дугаар"
              value={userInfo.phone_number}
            />
            <Settings
              icon={<Entypo name="address" size={24} color="black" />}
              label="Хүргэлтийн хаяг"
              value={userInfo.address}
            />
            <Settings
              icon={<MaterialIcons name="password" size={24} color="black" />}
              label="Нууц үг"
              value={userInfo.password}
            />
          </View>
          <ScrollView className="h-16 px-2  py-1 ">
            {usCtx.state.ordersCurrentUser?.map?.((el, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log("object");
                  }}
                  className="flex flex-row w-full rounded-md border-[1px] my-2"
                  key={i}
                >
                  <View className="w-1/3">
                    <Image
                      className="h-min-16 h-36 object-contain w-full rounded-l-md"
                      src={el.items[0]?.images[0]}
                    />
                  </View>
                  <View className="w-2/3 px-2">
                    <Text className="my-2 font-bold text-xl">
                      {FormatStatus(el?.status)}
                    </Text>
                    <View className="flex flex-col gap-1">
                      <View className="flex flex-row justify-between">
                        <Text className="font-semibold">Нийт:</Text>
                        <Text>{formatPrice(el?.payment?.total)}</Text>
                      </View>
                      <View className="flex flex-row justify-between">
                        <Text className="font-semibold">Захиалсан:</Text>
                        <Text>{formatDate(el?.date)}</Text>
                      </View>
                      <View className="flex flex-row justify-between">
                        <Text className="font-semibold">Хүргэгдэх:</Text>
                        <Text>{formatDate(el?.estimated_date)}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/* <Divider /> */}
        </Fragment>
      )}
    </Fragment>
  );
};
