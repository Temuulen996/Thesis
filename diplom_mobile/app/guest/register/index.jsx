import { Image, Text, View } from "react-native";
import { ActivityIndicator, Appbar, TextInput } from "react-native-paper";
// import EthriftIcon from "../../../public/ehtift_icon.png";

import { Button } from "react-native-paper";
import { useContext, useState } from "react";

import { useRouter } from "expo-router";
import UserContext from "../../../context/user_context";
import Container from "../../../components/general/container";
export default () => {
  const [info, setInfo] = useState({
    fname: null,
    lname: null,
    email: null,
    password: null,
  });
  const [canSeePassword, setCanSeePassword] = useState(false);
  const usCtx = useContext(UserContext);
  const router = useRouter();
  return (
    <View className="flex-1 flex-col bg-slate-700">
      <View>
        <Appbar.Header className="bg-slate-700">
          <Appbar.Content color="white" title="Бүртгүүлэх" />
        </Appbar.Header>
      </View>
      <View className="h-44 w-full">
        <Image
          className="w-full h-full "
          source={require("../../../assets/images/logo_login.png")}
        />
      </View>
      <Container>
        <View>
          <TextInput
            onChangeText={(text) => {
              setInfo((prev) => {
                return { ...prev, fname: text };
              });
            }}
            mode="outlined"
            label="Нэр"
            placeholder=""
          />
        </View>
        <View>
          <TextInput
            onChangeText={(text) => {
              setInfo((prev) => {
                return { ...prev, lname: text };
              });
            }}
            mode="outlined"
            label="Овог"
            placeholder=""
          />
        </View>
        <View>
          <TextInput
            onChangeText={(text) => {
              setInfo((prev) => {
                return { ...prev, email: text };
              });
            }}
            mode="outlined"
            label="Email"
            placeholder=""
          />
        </View>
        <View>
          <TextInput
            onChangeText={(text) => {
              setInfo((prev) => {
                return { ...prev, password: text };
              });
            }}
            mode="outlined"
            label="Нууц үг"
            secureTextEntry={!canSeePassword}
            placeholder=""
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => {
                  setCanSeePassword((prev) => !prev);
                }}
              />
            }
          />
        </View>
        <View className=" flex-row justify-center my-2">
          <Button
            textColor="white"
            icon="login"
            onPress={() => {
              usCtx.signUp(info.fname, info.lname, info.email, info.password);
            }}
          >
            Бүртгүүлэх
          </Button>
          <Button
            textColor="white"
            icon="login"
            onPress={() => {
              router.navigate("/guest/login");
            }}
          >
            Өөрийн эрхээр нэвтрэх
          </Button>
        </View>
      </Container>
    </View>
  );
};
