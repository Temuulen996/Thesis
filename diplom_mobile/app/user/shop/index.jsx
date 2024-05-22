import React from "react";
import {
  ActivityIndicatorComponent,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  TextInput,
  Checkbox,
} from "react-native-paper";

import ShopClothes from "../../../components/clothes/clothes_shop";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import ClothesContext from "../../../context/clothes_context";

import GlobalContext from "../../../context/global_context";
import EAppbar from "../../../components/general/eappbar";
import { API_URL, PRODUCTION_API_URL } from "../../../config/config";
import axios from "axios";
import { Slider } from "react-native-elements";
import { formatPrice } from "../../../utils/format_price";
import { useIsFocused } from "@react-navigation/native";
const DATA = [
  { id: "1", title: "First Item" },
  { id: "2", title: "Second Item" },
  { id: "3", title: "Third Item" },
  // Add more items as needed
];
const containerStyle = { backgroundColor: "white", padding: 20 };
export default (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  // const tabBarHeight = useBottomTabBarHeight();
  const clCtx = useContext(ClothesContext);
  const glCtx = useContext(GlobalContext);
  const params = useLocalSearchParams();
  const isFocused = useIsFocused();
  const { all } = params;
  const sizeOptions = [
    { name: "Small", size: "S" },
    { name: "Medium", size: "M" },
    { name: "Large", size: "L" },
    { name: "Extra large", size: "XL" },
  ];
  const genderOptions = [
    { name: "Female", value: "FM" },
    { name: "Male", value: "M" },
  ];
  useEffect(() => {
    if (isFocused) {
      init();
    }
  }, [isFocused]);

  const init = async () => {
    console.log("sd");
    glCtx.setLoadingReq(true);
    try {
      // await clCtx.loadClothes();
      await fetchClothes();
      await clCtx.loadCartItems();
      await clCtx.loadCategories();
      glCtx.setLoadingReq(false);
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };

  const fetchClothes = async () => {
    if (
      !minPrice &&
      !maxPrice &&
      filterText === "" &&
      selectedSizes == [] &&
      selectedGender == [] &&
      selectedCategory == []
    ) {
      glCtx.setLoadingReq(true);

      axios
        .get(
          `${
            process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
          }/api/clothes?page=${1}&limit=12`
        )
        .then((data) => {
          clCtx.setState((prev) => {
            return { ...prev, clothes: data?.data?.data };
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          glCtx.setLoadingReq(false);
        });
    } else {
      glCtx.setLoadingReq(true);
      try {
        await clCtx.filterClothes(
          minPrice,
          maxPrice,
          filterText,
          selectedSizes,
          selectedCategory,
          selectedGender
        );
      } catch (err) {
        console.log(err);
        glCtx.setLoadingReq(false);
      }

      glCtx.setLoadingReq(false);
    }
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  const handleCategoryChange = (category) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((s) => s !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
  };
  const handleGenderChange = (gender) => {
    if (selectedGender.includes(gender)) {
      setSelectedGender(selectedGender.filter((g) => g !== gender));
    } else {
      setSelectedGender([...selectedGender, gender]);
    }
  };
  const handlePriceChange = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };
  return (
    <View className="flex-1 flex-col h-full ">
      <EAppbar logo title="Дэлгүүр" cart drawer />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mt-2">
              <View>
                <Slider
                  trackStyle={{ height: 10, backgroundColor: "transparent" }}
                  thumbStyle={{
                    height: 20,
                    width: 20,
                    backgroundColor: "transparent",
                  }}
                  value={minPrice}
                  maximumValue={clCtx.state?.filterMaxPrice}
                  minimumValue={0}
                  onValueChange={(value) => setMinPrice(value)}
                />
                <Text>Утга: {formatPrice(minPrice)}</Text>
              </View>
              <View>
                <Slider
                  trackStyle={{ height: 10, backgroundColor: "transparent" }}
                  thumbStyle={{
                    height: 20,
                    width: 20,
                    backgroundColor: "transparent",
                  }}
                  value={maxPrice}
                  maximumValue={100000000}
                  minimumValue={clCtx.state?.filterMinPrice}
                  onValueChange={(value) => setMaxPrice(value)}
                />
                <Text>Утга: {formatPrice(maxPrice)}</Text>
              </View>

              <TextInput
                onChangeText={(text) => {
                  console.log(text);
                  setFilterText(text);
                }}
                mode="outlined"
                label="Нэрээр шүүх..."
                placeholder="Type something"
                right={<TextInput.Affix text="/100" />}
              />

              <View className="my-2">
                <Text className="text-xl font-semibold">Төрөл</Text>
                {clCtx?.state.categories?.map?.((elem, i) => {
                  return (
                    <Checkbox.Item
                      key={i}
                      onPress={() => handleCategoryChange(elem._id)}
                      label={elem.name}
                      status={
                        selectedCategory.includes(elem._id)
                          ? `checked`
                          : "unchecked"
                      }
                    />
                  );
                })}
              </View>
              <View className="my-2">
                <Text className="text-xl font-semibold">Хэмжээ</Text>
                {sizeOptions.map?.((elem, i) => {
                  return (
                    <Checkbox.Item
                      key={i}
                      onPress={() => handleSizeChange(elem.size)}
                      label={elem.name}
                      status={
                        selectedSizes.includes(elem.size)
                          ? `checked`
                          : "unchecked"
                      }
                    />
                  );
                })}
              </View>
              <View className="my-2">
                <Text className="text-xl font-semibold">Хүйс</Text>
                {genderOptions.map?.((elem, i) => {
                  return (
                    <Checkbox.Item
                      key={i}
                      onPress={() => handleGenderChange(elem.value)}
                      label={elem.name}
                      status={
                        selectedGender.includes(elem.value)
                          ? `checked`
                          : "unchecked"
                      }
                    />
                  );
                })}
              </View>
              <View className="my-2">
                <Button
                  onPress={() => {
                    hideModal();
                    // router.navigate(`/user/shop?minPrice=${minPrice}&maxPrice=${maxPrice}&filterText=${filterText}&selectedSizes=${selectedSizes}&selectedCategory=${selectedCategory}&selectedGender=${selectedGender}&all=false`);
                    fetchClothes();
                  }}
                >
                  Шүүх
                </Button>
                <Button
                  onPress={() => {
                    setMaxPrice(0);
                    setMinPrice(0);
                    setFilterText("");
                    setSelectedSizes([]);
                    setSelectedCategory([]);
                    setSelectedGender([]);
                    // fetchClothes();
                    // hideModal();
                  }}
                >
                  Цэвэрлэх
                </Button>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
      <View className="w-auto flex-row  justify-center my-2   py-2  px-1">
        <TouchableOpacity
          className="w-full  text-center flex-row justify-center bg-slate-700 py-2  px-2 rounded-md"
          onPress={() => {
            showModal();
            // router.navigate("/user/shop?all=false");
          }}
        >
          <Text className="text-white text-lg font-bold">Шүүх</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              await clCtx.loadClothes();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        key={"_"}
        data={clCtx.state.clothes}
        renderItem={(elem) => (
          <ShopClothes navigation={props.navigation} clothing={elem.item} />
        )}
        keyExtractor={(item, i) => i}
        numColumns={2}
      />
    </View>
  );
};
