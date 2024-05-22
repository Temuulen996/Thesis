"use client";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = ({ dataa, label }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [],
        borderColor: ["rgb(0,0,255)"],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    if (Array.isArray(dataa)) {
      let dataset = {
        label: "",
        data: dataa?.map?.((el) => el.count),
        backgroundColor: dataa?.map?.(() => generateRgb()),
        borderColor: ["white"],
        borderWidth: 1,
      };

      setData({ labels: dataa?.map?.((el) => el.name), datasets: [dataset] });
    }
  }, [dataa]);
  const generateRgb = () => {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
  };
  return (
    <div className="max-w-[800px] max-h-[800px] flex flex-col justify-center ">
      <h1 className="w-full text-center font-bold text-xl my-2">| {label} |</h1>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
