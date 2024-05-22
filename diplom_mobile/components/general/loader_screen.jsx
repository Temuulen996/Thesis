import GlobalContext from "@/context/global_context";
import { Fragment, useContext } from "react";
import { Text, View } from "react-native";
import { Spinner } from "native-base";
const ELoaderScreen = () => {
  const glCtx = useContext(GlobalContext);
  return (
    <Fragment>
      {glCtx.isLoadingReq && (
        <View className="absolute left-0 top-0 w-screen z-[500] bg-white  h-full  flex-row items-center justify-center">
          <Spinner size="lg" color="#302c2c" />
        </View>
      )}
    </Fragment>
  );
};

export default ELoaderScreen;
