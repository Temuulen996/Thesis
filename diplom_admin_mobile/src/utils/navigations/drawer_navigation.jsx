import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./stack_navigation";
import * as Sc from "../../screens";
import HomeScreen from "../../screens/home/home_screen";
const Drawer = createDrawerNavigator();
const { Navigator, Screen } = Drawer;
const EdrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Profile" component={StackNavigator} />
    </Drawer.Navigator>
  );
};

export default EdrawerNavigation;
