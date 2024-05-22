import { Fragment, useContext } from "react";
import * as Native from "react-native";
import GlobalContext from "../../../../context/global_context";

const SuccessScreen = () => {
    const glCtx = useContext(GlobalContext);
    return (
        <Fragment>
            {
                glCtx.successModal &&
                < Native.View className="flex h-screen w-full  z-[1000] bg-white absolute top-0 left-0" >
                    <Native.Image className="w-full" source={require("../../../../assets/gif/success.gif")} />
                    <Native.View className="w-full"><Native.Text className="font-bold text-3xl text-center">Амжилттай</Native.Text></Native.View>
                </Native.View >
            }
        </Fragment>
    );
}

export default SuccessScreen;