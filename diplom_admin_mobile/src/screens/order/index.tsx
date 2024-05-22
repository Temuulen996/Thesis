import React, { useContext, useEffect, useState } from "react";
import * as Native from "react-native";

import Eappbar from "../../components/general/eappbar";
import { useIsFocused } from "@react-navigation/native";
import AdminContext from "../../context/admin_context";
import { formatPrice } from "../../utils/format_price";
import { formatDate } from "../../utils/format_date";
import { DataTable, FAB } from "react-native-paper";
import CustomDataTable from "../../components/data-display/custom-table";
// import Table from "../../components/data-display/table";
export default () => {
  const [items] = useState([
    {
      key: 1,
      name: "Cupcake",
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
  ]);
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [row, setRow] = useState();
  const adCtx = useContext(AdminContext);
  const isFocused = useIsFocused();
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  useEffect(() => {
    if (isFocused) {
      console.log(adCtx.state);
      init();
    }
  }, [isFocused]);
  const init = async () => {
    await adCtx.loadAllOrders();
  };
  const tableHeader = [
    { label: "ID", name: "_id" },
    { label: "Хаяг", name: "payment" },
    { label: "Утасны дугаар", name: "_id" },
    { label: "Захиалгын төлөв", name: "_id" },
    { label: "Нийт төлөлт", name: "_id" },
    { label: "Төлбөрийн төлөв", name: "_id" },
  ];

  return (
    <Native.View className="h-full">
      <Eappbar
        title="Захиалгууд"
        logout={true}
        back={false}
        logo={true}
        cart={false}
        onBackPress={undefined}
        navigation={undefined}
      />
      <Native.View>
        <CustomDataTable
          headers={tableHeader}
          dataSource={adCtx.state.orders}
          Reload={init}
        />
      </Native.View>
    </Native.View>
  );
};
