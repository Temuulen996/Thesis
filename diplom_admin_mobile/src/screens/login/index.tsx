import { Image, Text, View } from "react-native";
import { ActivityIndicator, Appbar, TextInput } from "react-native-paper";

import Container from "../../components/general/container";
import { Button } from "react-native-paper";
import { useContext, useState } from "react";

import { useRouter } from "expo-router";
import UserContext from "../../context/user_context";
export default () => {
  const [info, setInfo] = useState({
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
          <Appbar.Content color="white" title="Нэвтрэх" />
        </Appbar.Header>
      </View>
      <View className="h-44 w-full">
        <Image
          className="w-full h-full "
          source={require("../../../assets/images/logo_login.png")}
        />
      </View>
      <Container>
        <View className="my-2">
          <TextInput
            onChangeText={(text) => {
              setInfo((prev) => {
                return { ...prev, email: text };
              });
            }}
            // onChange={(e) => {

            //   setInfo((prev) => {
            //     return { ...prev, email: e.target.value };
            //   });
            //   //
            // }}
            mode="outlined"
            label="email"
            placeholder="example@gmail.com"
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
              usCtx.login(info.password, info.email);
            }}
          >
            Нэвтрэх
          </Button>
        </View>
      </Container>
    </View>
  );
};
