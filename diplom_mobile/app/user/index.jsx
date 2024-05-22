import { Button, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "../../components/general/container";
import "tailwindcss-react-native";
import HomeBanner from "../../components/home/banner";
import AppBar from "../../components/layouts/appbar";
import { EvilIcons, Feather } from "@expo/vector-icons";
// import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
// import { Divider } from "react-native-paper";
import Ebutton from "../../components/general/ebutton";
import { Fragment, useContext, useEffect, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import UserContext from "../../context/user_context";
import EAppbar from "../../components/general/eappbar";
import ClothesContext from "../../context/clothes_context";
import EHorizontalSlider from "../../components/home/horizontal_slider";
import GlobalContext from "../../context/global_context";

export default () => {
  const usCtx = useContext(UserContext);
  const clCtx = useContext(ClothesContext);
  const glCtx = useContext(GlobalContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      init();
    }
  }, [isFocused]);
  const init = async () => {
    glCtx.setLoadingReq(true);
    try {
      await usCtx.authorization();

      clCtx.LoadhomePageClothesInfo();
      clCtx.loadNewItems();
      clCtx.loadCartItems();
      glCtx.setLoadingReq(false);
    } catch (err) {
      glCtx.setLoadingReq(false);
      console.log(err);
    }
  };
  return (
    <Fragment>
      {usCtx.state.isLogged && (
        <Fragment>
          <EAppbar logo title="Дэлгүүр" cart drawer />

          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            className="px-4 py-2 mb-4"
          >
            {/* <AppBar /> */}
            <HomeBanner />
            <View>
              <EHorizontalSlider
                bgcolor="bg-white"
                label="Шинээр нэмэгдсэн хувцас"
                clothes={clCtx.state?.newClothes}
              />
            </View>
            <View>
              <EHorizontalSlider
                bgcolor="bg-white"
                label="Factory new хувцаснууд"
                clothes={clCtx.state.homePageClothesInfo?.wellWornOrNewClothes}
              />
            </View>
            <View>
              <EHorizontalSlider
                bgcolor="bg-white"
                label="Хамгийн их үзэлттэй хувцаснууд"
                clothes={clCtx.state.homePageClothesInfo?.topReviewedClothes}
              />
            </View>
            <View>
              <EHorizontalSlider
                bgcolor="bg-white"
                label="Хамгийн өндөр үнэлгээтэй хувцаснууд"
                clothes={clCtx.state.homePageClothesInfo?.topRatedClothes}
              />
            </View>
          </ScrollView>

          {/* <Divider /> */}
        </Fragment>
      )}
    </Fragment>
  );
};
