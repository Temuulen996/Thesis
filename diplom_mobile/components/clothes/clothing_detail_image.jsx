"use client";

import { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

const ClothingDetailImage = ({ clothing }) => {
  const [selectedImg, setSelectedImg] = useState(clothing?.images[0]);
  const handleImageSelect = (image) => {
    setSelectedImg(image);
  };

  return (
    <View className=" flex-row h-1/2 w-full max-h-[300px] ">
      {/* <View className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-auto w-1/6 ">
        {clothing?.images?.map?.((image, i) => {
          return (
            <View
              key={i}
              onClick={() => {
                handleImageSelect(image);
              }}
              className={`relative w-[80%] aspect-square rounded border-teal-300 ${
                image === selectedImg ? "border-[1.5px]" : " border-none"
              }`}
            >
              <Image src={image} fill className="object-contain" alt="" />
            </View>
          );
        })}
      </View>
      <View className="w-5/6 relative h-full  bg-green-500">
        <Image
          alt=""
          src={selectedImg}
          fill
          className="h-full object-contain  bg-red-500"
        />
      </View> */}

      <View className="w-1/6 px-1 py-1">
        <View className="border-[1px] border-slate-400 h-full flex-1 flex-col items-center justify-center px-1">
          {clothing?.images?.map?.((image, i) => {
            return (
              <TouchableOpacity
                className={` w-full px-1 aspect-square border-teal-500  my-1  rounded-md   ${
                  image === selectedImg ? "border-[1px]" : " border-none"
                }`}
                key={i}
                onPress={() => {
                  handleImageSelect(image);
                }}
              >
                <Image
                  src={image}
                  fill
                  alt=""
                  className="h-full object-contain  "
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View className="w-5/6 relative h-full   px-1 py-1">
        <Image
          alt=""
          src={selectedImg}
          fill
          className="h-full object-contain  "
        />
      </View>
    </View>
  );
};

export default ClothingDetailImage;
