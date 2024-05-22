import { Button, Image, Text, View } from "react-native";
import { API_URL } from "../../config/config";
const HomeBanner = () => {
  return (
    <View className="flex flex-row w-full  max-h-[150px]  bg-blue-400 rounded-xl px-2 py-2 mb-2">
      <View className="w-1/2 flex flex-col justify-around">
        <View>
          <Text className="text-2xl font-bold text-orange-300">Ethrift MONGOLIA</Text>
        </View>
        <View>
          <Text className="text-xl text-white">Байгалд ээлтэй.</Text>
        </View>
      </View>
      <View className="w-1/2 ">
        <Image
          className="h-full w-full"
          src="https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </View>
    </View>
  );
};

export default HomeBanner;
