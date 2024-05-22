import { LineChart, PieChart, ScatterChart } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
const Dashboard = () => {
  return (
    <div className="flex">
      <BarChart
        series={[{ data: [1, 2, 3, 2, 1] }]}
        xAxis={[{ scaleType: "band", data: ["A", "B", "C", "D", "E"] }]}
        height={300}
        width={300}
        leftAxis={null}
      />
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "series A" },
              { id: 1, value: 15, label: "series B" },
              { id: 2, value: 20, label: "series C" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default Dashboard;
