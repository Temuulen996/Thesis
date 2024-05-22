import React, { FC, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { formatDate } from "../../../utils/format_date";
import { formatPrice } from "../../../utils/format_price";
import { Modal, Portal, TextInput } from "react-native-paper";
import Ebutton from "../../general/ebutton";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import { API_URL, PRODUCTION_API_URL } from "../../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormatStatus } from "../../../utils/format_status";

interface CustomDataTableProps {
  dataSource: any[];
  headers: any[];
  Reload: () => void;
}
interface OrderModalProps {
  modal: boolean;
  HideModal: () => void;
  Save: () => void;
  selected: any;
  Reload: () => void;
}
const OrderModal = (props: OrderModalProps) => {
  const [status, setStatus] = useState(null);

  const Save = async () => {
    try {
      const token = await AsyncStorage.getItem("emp_token");
      const categoryRes = await axios.put(
        `${
          process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
        }/api/order/status/${props.selected?._id}`,
        { status: status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      props.Reload();
      props.HideModal();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <Portal>
        <Modal
          visible={props.modal}
          onDismiss={props.HideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <View className="px-3">
            <View className="my-2">
              <Text className="font-bold mb-2 ">Захиалгын төлөв</Text>
              <SelectList
                onSelect={() => {}}
                setSelected={(val: string) => setStatus(val)}
                data={[
                  { key: "Pending", value: "Pending" },
                  { key: "Complete", value: "Complete" },
                ]}
                defaultOption={{
                  key: props.selected?.status,
                  value: props.selected?.status,
                }}
              />
            </View>
            <Ebutton
              icon={<FontAwesome name="exchange" size={24} color="white" />}
              classNamee=""
              label="Хадгалах"
              func={(): void => {
                Save();
              }}
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};
const CustomDataTable = (props: CustomDataTableProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [selected, setSelected] = useState(null);
  const HideModal = () => {
    setModal(false);
  };
  return (
    <ScrollView horizontal={true}>
      <OrderModal
        modal={modal}
        HideModal={HideModal}
        Save={function (): void {
          throw new Error("Function not implemented.");
        }}
        selected={selected}
        Reload={props.Reload}
      />
      <View className="border-[1px] my-2">
        <View className="flex flex-row border-b-[1px] bg-slate-700">
          {props.headers?.map?.((el, i) => (
            <View key={i} className="border-r-[1px] " style={styles.headerCell}>
              <Text className="text-white font-bold ">{el?.label}</Text>
            </View>
          ))}
        </View>
        <ScrollView>
          {props.dataSource?.map?.((item, i) => (
            <TouchableOpacity
              className=""
              key={i}
              style={styles.row}
              onPress={() => {
                setSelected(item);
                setModal(true);
              }}
            >
              <View style={styles.cell}>
                <Text>{item?._id}</Text>
              </View>
              <View style={styles.cell}>
                <Text>{item?.payment?.address}</Text>
              </View>
              <View style={styles.cell}>
                <Text>{item?.payment?.phone_number}</Text>
              </View>
              <View style={styles.cell}>
                <Text>{FormatStatus(item?.status)}</Text>
              </View>
              <View style={styles.cell}>
                <Text>{formatPrice(item?.payment?.total)}</Text>
              </View>
              <View style={styles.cell}>
                <Text>{FormatStatus(item?.payment?.status)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
  },
  row: {
    flexDirection: "row",

    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  headerCell: {
    padding: 10,
    width: 100,
    color: "white",
  },
  cell: {
    padding: 10,
    width: 100,
    borderColor: "black",
    borderRightWidth: 1,
  },
  containerStyle: { backgroundColor: "white", padding: 20 },
});

export default CustomDataTable;
