import AdminContext from "@/context/admin_context";
import { formatNumber } from "@/utils/format_number";
import { formatPrice } from "@/utils/format_price";
import moment from "moment";
import { useContext, useEffect, useState } from "react";

const Summary = ({ orders, users, clothes }) => {
  const [summaryData, setSummaryData] = useState({
    sale: {
      label: "Нийт борлуулалт ( Энэ сар )",
      digit: 0,
    },
    clothes: {
      label: "Нийт хувцас",
      digit: 0,
    },
    paidOrders: {
      label: "Төлөгдсөн захиалга",
      digit: 0,
    },
    unpaidOrders: {
      label: "Төлөгдөөгүй захиалга",
      digit: 0,
    },
    users: {
      label: "Нийт хэрэглэгч",
      digit: 0,
    },
  });
  const adCtx = useContext(AdminContext);
  useEffect(() => {
    console.log(adCtx.state);
    setSummaryData((prev) => {
      let tempData = { ...prev };
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Adding 1 because months are zero-based
      const currentYear = currentDate.getFullYear();
      const totalSale = orders?.reduce?.((acc, item) => {
        console.log(item);
        const isPaid = item.payment.status === "Paid";
        const isCurrentMonth =
          new Date(item.payment.created_at).getMonth() + 1 === currentMonth;
        const isCurrentYear =
          new Date(item.payment.created_at).getFullYear() === currentYear;
        if (isPaid && isCurrentMonth && isCurrentYear) {
          return acc + item.payment.total;
        } else return acc;
      }, 0);
      const paidOrders = orders?.filter?.((order) => {
        return order.payment.status === "Paid";
      });
      const unpaidOrders = orders?.filter?.((order) => {
        return (
          order.payment.status === "Pending" ||
          order.payment.status === "Cancelled"
        );
      });
      tempData.sale.digit = totalSale;
      tempData.paidOrders.digit = paidOrders?.length;
      tempData.unpaidOrders.digit = unpaidOrders?.length;
      tempData.clothes.digit = clothes?.length;
      tempData.users.digit = users?.reduce?.((acc, el) => {
        if (el.role === "user") {
          return ++acc;
        } else return acc;
      }, 0);
      return tempData;
    });
  }, [orders, clothes, users]);
  const getGraphData = () => {
    try {
      const startDate = moment().sub;
    } catch (err) {
      console.log(err);
    }
  };
  const summaryKeys = Object.keys(summaryData);
  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <h1 className="text-center font-bold text-3xl">Stats</h1>
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-[50vh]  overflow-y-auto ">
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
                key={key}
              >
                <div className="text-xl md:text-4xl font-bold">
                  {summaryData[key].label === "Нийт борлуулалт ( Энэ сар )" ? (
                    <>{formatPrice(summaryData[key].digit)}</>
                  ) : (
                    <>{formatNumber(summaryData[key].digit)}</>
                  )}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
