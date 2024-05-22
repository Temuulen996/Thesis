import * as Native from "react-native";
import Eappbar from "../../components/general/eappbar";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import Ebutton from "../../components/general/ebutton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL, PRODUCTION_API_URL } from "../../config/config";
import { showMessage } from "react-native-flash-message";
export default () => {
  const [category, setCategory] = useState<string | null>(null);
  const handleInsertCategory = async () => {
    if (!category || category === "") {
      return showMessage({
        message: "Талбарыг бүрэн бөглөнө үү!",
        type: "warning",
      });
    }
    try {
      const token = await AsyncStorage.getItem("emp_token");
      const categoryRes = await axios.post(
        `${
          process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
        }/api/category`,
        { name: category },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("🚀 ~ handleInsertCategory ~ category:", categoryRes);
      showMessage({
        message: "Төрөл амжилттай бүртгэгдлээ.",
        type: "warning",
      });
      setCategory(null);
    } catch (err: any) {
      showMessage({
        message: "Алдаа гарлаа",
        type: "danger",
      });
      console.log(err);
    }
  };

  return (
    <Native.View>
      <Eappbar
        title="Тохиргоо"
        logout={true}
        back={false}
        logo={true}
        cart={false}
        onBackPress={undefined}
        navigation={undefined}
      />
      <Native.View className="px-3">
        <TextInput
          label="Шинээр хувцасны төрөл нэмэх.."
          value={category}
          onChangeText={(text) => setCategory(text)}
          className="my-2"
        />
        <Ebutton
          classNamee=""
          label="Төрөл Нэмэх"
          func={(): void => {
            handleInsertCategory();
          }}
        />
      </Native.View>
    </Native.View>
  );
};
