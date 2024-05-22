import { Fragment, useContext } from "react";
import { Text, View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import GlobalContext from "../../context/global_context";
const ELoaderScreen = () => {
  const glCtx = useContext(GlobalContext);
  return (
    <Fragment>
      {glCtx.isLoadingReq && (
        <View className="absolute left-0 top-0 w-screen z-[500] bg-white  h-full flex-row items-center justify-center">
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>
      )}
    </Fragment>
  );
};

export default ELoaderScreen;
