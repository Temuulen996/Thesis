import { Stack } from "expo-router";
import { Text } from "react-native";

export default () => {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />
    // {/* <Stack.Screen
    //   name="/clothes_details/[id]"
    //   options={{
    //     headerShown: true,

    //     header: () => {
    //       return <Text>back</Text>;
    //     },
    //   }}
    // /> */}
    // {/* <Stack.Screen options={{ headerShown: false }} name="/" /> */}
  );
};
