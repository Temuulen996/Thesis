"use client";
import AdminNav from "@/components/admin_layout/admin_nav";
import NullDataProps from "@/components/clothes/null_data";
import GlobalContext from "@/context/global_context";
import UserContext from "@/context/user_context";
import React, { useContext, useEffect, useState } from "react";
import Summary from "./summary";
import axios from "axios";
import { getCookie } from "cookies-next";
import PieChart from "@/components/data/pie_chart";
import ClothesContext from "@/context/clothes_context";
import AdminContext from "@/context/admin_context";
import BarChart from "@/components/data/bar_chart";
import Container from "@/components/general/container";

export default () => {
  const [clothes, setClothes] = useState(null);
  const [chartData, setChartData] = useState({
    pie_chart: null,
    pie_chart_payment: null,
    bar_chart: null,
  });
  const usCtx = useContext(UserContext);
  const glCtx = useContext(GlobalContext);
  const clCtx = useContext(ClothesContext);
  const adCtx = useContext(AdminContext);
  useEffect(() => {
    //хуудас зурагдах үед uer, new item, clothes-ийн мэдээллүүдийг татан context-д хадгална.
    init();
  }, []);
  const init = async () => {
    glCtx.setLoadingReq(true);
    const token = getCookie("admin_token");
    try {
      glCtx.setLoadingReq(true);

      await usCtx.authorization();

      await clCtx.loadOrders();

      // console.log(clCtx.state.orders);
      const res = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/clothes/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      addEventListener;
      axios
        .get(
          `${
            process.env.NODE_ENV === "production"
              ? process.env.PRODUCTION_API_URL
              : process.env.API_URL
          }/api/clothes/piechart`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setChartData((prev) => {
            return {
              ...prev,
              pie_chart: res.data.data,
            };
          });
        });
      usCtx.loadUsers();

      await PreparePieChartPaymentData();
      await adCtx.loadOrderDataByMonth();
      clCtx.loadCartItems();

      setClothes(res.data.data);
      glCtx.setLoadingReq(false);
    } catch (err) {
      console.log(err);
      glCtx.setLoadingReq(false);
    }
  };
  const PreparePieChartPaymentData = async () => {
    let orders = [];
    try {
      const data = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.PRODUCTION_API_URL
            : process.env.API_URL
        }/api/order`,
        {
          headers: { Authorization: `Bearer ${getCookie("admin_token")}` },
        }
      );
      orders = data.data.data;
    } catch (err) {
      console.log(err);
    }
    let pie_payment = [
      {
        name: "paid",
        count: orders?.reduce?.((acc, el) => {
          if (el.payment.status === "Paid") {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0),
      },
      {
        name: "unpaid",
        count: orders?.reduce?.((acc, el) => {
          if (
            el.payment.status === "Cancelled" ||
            el.payment.status === "Pending"
          ) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0),
      },
    ];
    setChartData((prev) => {
      return {
        ...prev,
        pie_chart_payment: pie_payment,
      };
    });
  };

  return (
    <>
      {usCtx.state.isLogged && (
        <div className="pt-8">
          <Container>
            <Summary
              clothes={clothes}
              users={usCtx.state.users}
              orders={clCtx.state.orders}
            />
            <div className="grid grid-cols-12 my-4 w-full  max-w-[1920px] gap-x-2 gap-y-4 justify-between  rounded-lg ">
              <div className="col-span-6 bg-slate-200 py-3 rounded-lg">
                <PieChart dataa={chartData.pie_chart} label="Хувцас" />
              </div>
              <div className="col-span-6 bg-slate-200 py-3 rounded-lg">
                <PieChart dataa={chartData.pie_chart_payment} label="Төлбөр" />
              </div>
              <div className="col-span-12  bg-slate-200 py-1 px-2 rounded-lg">
                <BarChart data={adCtx.state.bar_chart} />
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};
