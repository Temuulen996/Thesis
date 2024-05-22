import { Text, View } from "react-native";
import ClothingDetails from "../../../../components/clothes/clothing_details";
import {
  useLocalSearchParams,
  useLocation,
  useNavigation,
  useRouter,
} from "expo-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL, PRODUCTION_API_URL, DB_URI } from "../../../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
import GlobalContext from "../../../../context/global_context";
import ELoaderScreen from "../../../../components/general/loader_screen";
import EAppbar from "../../../../components/general/eappbar";
export default () => {
  const [inCart, setInCart] = useState(false);
  const [clothes, setClothes] = useState(null);
  // const location = useLocation();
  // const { clothing } = location.state;
  const glCtx = useContext(GlobalContext);
  const params = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    init();
    return () => {
      // Cleanup code here
      // This function is called when the component unmounts or before the effect runs again
    };
  }, []);
  const init = async () => {
    glCtx.setLoadingReq(true);
    try {
      const token = await AsyncStorage.getItem("token");

      axios
        .get(
          `${
            process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
          }/api/clothes/${params?.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          return res?.data?.data;
        })
        .then((data) => {
          setClothes(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          glCtx.setLoadingReq(false);
        });
      axios
        .get(
          `${
            process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
          }/api/cart_item/in_cart/${params?.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setInCart(res?.data?.inCart);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };
  if (!clothes) return <ELoaderScreen />;
  return (
    <View className="w-full  flex-1 justify-center bg-white">
      <EAppbar back title="Дэлгэрэнгүй" />
      <ClothingDetails
        inCart={inCart}
        setInCart={setInCart}
        clothing={clothes}
      />
    </View>
  );
};
