import { View } from "react-native";
import { Modal, Portal, TextInput } from "react-native-paper";
import Ebutton from "../../../components/general/ebutton";
import { AntDesign } from "@expo/vector-icons";

export default EditModal = ({
  editModalVisible,
  userInfo,
  setEditModalVisible,
  setUserInfo,
  updateInfo,
}) => {
  console.log(userInfo);
  return (
    <Portal>
      <Modal
        visible={editModalVisible}
        onDismiss={() => {
          setEditModalVisible(false);
        }}
        contentContainerStyle={containerStyle}
      >
        <View>
          <View>
            <TextInput
              label="Утасны дугаар"
              onChangeText={(text) => {
                setUserInfo((prev) => {
                  return {
                    ...prev,
                    phone_number: text,
                  };
                });
              }}
              value={userInfo?.phone_number}
              mode="outlined"
            />
            <TextInput
              onChangeText={(text) => {
                setUserInfo((prev) => {
                  return {
                    ...prev,
                    address: text,
                  };
                });
              }}
              label="Хаяг"
              value={userInfo?.address}
              mode="outlined"
            />
            <TextInput
              onChangeText={(text) => {
                setUserInfo((prev) => {
                  return {
                    ...prev,
                    password: text,
                  };
                });
              }}
              label="Нууц үг"
              value={userInfo?.password}
              mode="outlined"
            />
            <Ebutton
              icon={<AntDesign name="edit" size={24} color="white" />}
              label="Шинэчлэх"
              classNamee="mt-2"
              func={() => {
                updateInfo();
              }}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
const containerStyle = { backgroundColor: "white", padding: 20 };
