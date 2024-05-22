import { useRoute } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

const AppBar = (props) => {
  const route = useRoute();
  return (
    <Appbar.Header>
      <Appbar.Content title={route.name} subtitle="Subtitle" />
      <Appbar.Action icon="magnify" onPress={() => console.log("Searching")} />
      <Appbar.Action
        icon="dots-vertical"
        onPress={() => console.log("Shown more")}
      />
    </Appbar.Header>
  );
};

export default AppBar;
