"use client";

import axios from "axios";

const { createContext, useState } = require("react");

const AdminContext = createContext();

const initialState = {
  pie_chart: null,
  bar_chart: null,
};
export const AdminProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

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
          bar_chart: data?.data?.data,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AdminContext.Provider value={{ state, loadOrderDataByMonth }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
