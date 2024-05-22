import { Image, Text, TouchableOpacity, View } from "react-native";
import { formatPrice } from "../../utils/format_price";
import { truncateText } from "../../utils/truncate_text";
import { useNavigation, useRouter } from "expo-router";

const ECard = ({ clothing, bgcolor }) => {
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="w-full h-full "
      onPress={() => {
        router.push(`/user/shop/clothes_details/${clothing._id}`);
      }}
    >
      <View
        className={`shadow-md col-span-1 cursor-pointer h-full border-[1.2px] border-slate-200 ${bgcolor} rounded-sm p-2 duration-100 transition-all  hover:scale-105 text-center text-sm`}
      >
        <View className="flex flex-col items-center justify-between w-full gap-1 ">
          <View className="relative w-full overflow-hidden aspect-square ">
            <Image
              fill
              className="object-contain w-full h-full"
              src={clothing.images[0]}
            />
          </View>
          <Text className="mt-4 ">{truncateText(clothing.name)}</Text>

          <Text className="font-semibold">{formatPrice(clothing.price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ECard;
