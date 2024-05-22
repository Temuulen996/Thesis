import { useContext, useEffect } from "react";
import * as Native from "react-native";
import UserContext from "../../context/user_context";
export default () => {
  const usCtx = useContext(UserContext);
  useEffect(() => {
    setTimeout(() => {
      init();
    }, 3000);
  }, []);
  const init = async () => {
    await usCtx.authorization();
  };
  return (
    <Native.View className="w-full h-screen flex flex-row justify-center items-center">
      <Native.Image
        className="w-64 h-64"
        source={require("../../../assets/images/logo.png")}
      />
    </Native.View>
  );
};
