"use client";

import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { API_URL, PRODUCTION_API_URL, DB_URI } from "../config/config";
const { createContext, useState } = require("react");

const AdminContext = createContext();

const initialState = {
  pie_chart: null,
  bar_chart: null,
  orders: null,
};
export const AdminProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const loadAllOrders = async () => {
    try {
      const orders = await axios.get(
        `${
          process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : API_URL
        }/api/order`
      );
      console.log("🚀 ~ loadAllOrders ~ orders:", orders?.data?.data);
      setState((prev) => {
        return {
          ...prev,
          orders: orders?.data?.data,
        };
      });
    } catch (err) {
      console.log(err);
      showMessage({
        message: err.message,
        type: "error",
        position: "center",
      });
    }
  };
  const loadOrderDataByMonth = async () => {
    try {
      const data = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/order/get_orderdata_by_month`
      );

      setState((prev) => {
        return {
          ...prev,
          bar_chart: data.data.data,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AdminContext.Provider
      value={{ state, loadOrderDataByMonth, loadAllOrders }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
