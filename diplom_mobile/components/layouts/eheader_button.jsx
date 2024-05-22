import { Ionicons } from "@expo/vector-icons";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";

const EheaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={30}
      color="white"
    />
  );
};

export default EheaderButton;
