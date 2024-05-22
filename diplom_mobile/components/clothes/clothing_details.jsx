import { useContext, useState } from "react";

import { Button, ScrollView, Text, View } from "react-native";
import ClothesContext from "../../context/clothes_context";
import { FormatClothingStatus } from "../../utils/format_clothing_status";
import { FormatGender } from "../../utils/format_gender";
import { formatPrice } from "../../utils/format_price";
import { Divider } from "react-native-paper";
import ClothingDetailImage from "./clothing_detail_image";
import Ebutton from "../general/ebutton";
import { Rating } from "react-native-ratings";
import { Icon } from "react-native-elements";

const ClothingDetails = ({ clothing, inCart, setInCart }) => {
  const clCtx = useContext(ClothesContext);

  const Horizontal = () => {
    return <View className="my-2 border-b  border-slate-400" />;
  };
  return (
    <ScrollView className="h-full bg-white">
      <View className="flex-col justify-start  h-auto px-2 mb-28">
        <ClothingDetailImage clothing={clothing} />
        <View className="flex flex-col gap-1 text-slate-700  h-1/2">
          <Text className="text-3xl font-medium text-slate-700 underline">
            {clothing?.name}
          </Text>
          <Horizontal />
          <View className="flex-row  justify-start items-center  gap-1">
            <Rating
              type="custom"
              tintColor="white"
              ratingBackgroundColor=""
              readonly
              startingValue={clothing?.rating / 20}
            />
            <View className="flex flex-row items-center">
              <Icon
                name="visibility"
                type="material"
                size={24}
                color="#212422"
                className="mr-2"
              />
              <Text className="text-md text-bold text-slate-700">
                {clothing?.review} үзэлт
              </Text>
            </View>
          </View>
          <Horizontal />
          <Text className="text-justify text-slate-700">
            {clothing?.description}
          </Text>
          <Horizontal />
          <View>
            <Text className="font-semibold text-slate-700">
              Төрөл: {clothing?.category_id?.name}
            </Text>
          </View>
          <View>
            <Text className="font-semibold text-slate-700">
              Хэрэглэсэн сар:{" "}
              {clothing?.used_month && `${clothing?.used_month} сар`}
            </Text>
          </View>
          <View>
            <Text className="font-semibold text-slate-700">
              Төлөв: {FormatClothingStatus(clothing?.status)}
            </Text>
          </View>
          <View>
            <Text className="font-semibold text-slate-700">
              Хүйс: {FormatGender(clothing?.gender)}
            </Text>
          </View>
          <View>
            <Text className="font-semibold text-slate-700">
              Хэмжээ: {clothing?.size}
            </Text>
          </View>
          <Horizontal />
          <View>
            <Text className="font-bold text-3xl text-slate-700">
              {formatPrice(clothing?.price)}
            </Text>
          </View>

          <View className="w-full ">
            {/* {inCart ? (
              <Text className="text-xl text-center font-semibold text-green-500 ">
                Энэ хувцас аль хэдийн сагслагдсан байна!
              </Text>
            ) : ( */}
            <Ebutton
              classNamee="mt-3"
              disabled={inCart}
              icon={
                <Icon name="sell" type="material" size={24} color="white" />
              }
              label="Сагсанд нэмэх"
              func={() => {
                clCtx.addToCart(clothing?._id);
                setInCart(true);
              }}
            />
            {/* )} */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ClothingDetails;
