import { ActivityIndicator, Image, Text, View } from "react-native";
import { formatPrice } from "../../utils/format_price";
import { Link, useRouter } from "expo-router";

const ShopClothes = ({ clothing }) => {
  const router = useRouter();
  return (
    <View className=" py-1 px-1 w-1/2 shadow-xl ">
      <View className="border-[1px] border-slate-300  px-1 py-1">
        <View>
          <Image
            className="h-min-16 h-36 object-contain w-full"
            src={clothing?.images[0]}
          />
        </View>
        <View className="my-1">
          <View>
            <Text className="font-semibold text-md">{clothing?.name}</Text>
          </View>

          <View className="my-1">
            <Text>{formatPrice(clothing?.price)}</Text>
          </View>
          <View className=" w-full my-1 bg-slate-700 py-1   text-white rounded-sm">
            <Link
              className="text-white text-center"
              href={{
                pathname: `/user/shop/clothes_details/${clothing._id}`,
                // /* 1. Navigate to the details route with query params */
                params: {
                  title: "Хувцасны мэдээлэл",
                  clothing: clothing,
                },
              }}
            >
              {/* <Button
                className="w-full border-none"
                title="Дэлгэрэнгүй"
                onPress={() => {
                  router.navigate("/user/clothes_details", {
                    state: {
                      clothing: clothing,
                      title: "Хувцасны мэдээлэл",
                    },
                  });
                }}
                type="clear"
                color="success"
              /> */}
              Дэлгэрэнгүй
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShopClothes;
