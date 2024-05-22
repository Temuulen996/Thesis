import { FlashList } from "@shopify/flash-list";
import { useContext } from "react";
import { Text, View } from "react-native";
import ClothesContext from "../../context/clothes_context";
import ECard from "./card";

const EHorizontalSlider = ({ clothes, bgcolor, label }) => {
  const clCtx = useContext(ClothesContext);
  if (!clothes || clothes.length === 0) {
    console.log("FlatList-д харуулах element байхгүй байна.");
    return null;
  }

  return (
    <View className="w-full h-auto my-2">
      <Text className="text-center font-semibold text-xl">{label}</Text>
      <FlashList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        data={clothes}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <View className="w-32 h-48 ">
            <ECard clothing={item} bgcolor={bgcolor} />
          </View>
        )}
        keyExtractor={(item, i) => i}
      />
    </View>
  );
};

export default EHorizontalSlider;
