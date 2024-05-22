"use client";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);
const BarChart = ({ data }) => {
  const currentYear = new Date().getFullYear();

  const dataa = {
    labels: data?.map?.((el) => el.month),
    datasets: [
      {
        label: currentYear + " Онд худалдаалагдсан хувцасны тоо",
        data: data?.map?.((el) => el.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="max-w-[1600px] max-h-[600px] flex flex-col justify-center ">
      <Bar
        data={dataa}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default BarChart;
