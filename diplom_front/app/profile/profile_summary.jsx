"use client";
import { formatNumber } from "@/utils/format_number";
import { formatPrice } from "@/utils/format_price";
import { Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const ProfileSummary = ({ orders }) => {
  console.log(orders);
  const [summaryData, setSummaryData] = useState({
    totalOrders: {
      label: "Нийт захиалгууд",
      digit: 0,
    },

    completeOrders: {
      label: "Амжилттай болсон захиалгууд",
      digit: 0,
    },
    pendingOrders: {
      label: "Хүлээгдэж буй захиалгууд",
      digit: 0,
    },
  });
  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };

      //   const totalSale = orders?.reduce?.((acc, item) => {
      //     if (item.payment.status === "Paid") {
      //       return acc + item.payment.total;
      //     } else return acc;
      //   }, 0);
      const completeOrders = orders?.filter?.((order) => {
        return order.status === "Complete";
      });
      const pendingOrders = orders?.filter?.((order) => {
        return order.status === "Pending";
      });
      tempData.totalOrders.digit = orders?.length;
      tempData.completeOrders.digit = completeOrders?.length;
      tempData.pendingOrders.digit = pendingOrders?.length;
      return tempData;
    });
  }, [orders]);
  const formatter = (value) => <CountUp end={value} separator="," />;
  const summaryKeys = Object.keys(summaryData);
  return (
    <div className="max-w-[1150px] m-auto">
      <div>
        <div className="grid grid-cols-3 gap-3 max-h-[50vh]  overflow-y-auto ">
          {summaryKeys &&
            summaryKeys.map((key) => {
              return (
                <div
                  className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition border-orange-400"
                  key={key}
                >
                  <div className="text-xl md:text-4xl font-bold flex justify-center">
                    <Statistic
                      valueStyle={{ textAlign: "center", fontSize: 35 }}
                      title={summaryData[key].label}
                      value={formatNumber(summaryData[key].digit)}
                      formatter={formatter}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
