import Chart from "chart.js/auto";
import { useEffect } from "react";
import "chartjs-plugin-datalabels";
function ChartComponentUser({ arrData }) {
  console.log("arrData", arrData);
  // biểu đồ
  const groupedOrders = arrData?.reduce((result, order) => {
    const day = order?.day;
    const totalOder = order?.totalOder;
    result[day] = (result[day] || 0) + totalOder;
    return result;
  }, {});
  const sumOrders = Object.keys(groupedOrders).map((day) => ({
    day: day,
    totalOder: groupedOrders[day],
  }));
  console.log("sumOrders", sumOrders);
  useEffect(() => {
    new Chart(document.getElementById("acquisitions"), {
      type: "bar",
      data: {
        labels: sumOrders.map((row) => row.day),
        datasets: [
          {
            label: "Người dùng",
            data: sumOrders.map((row) => row.totalOder),
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            display: true,
            color: "white",
            font: {
              weight: "bold",
            },
          },
        },
      },
    });
  }, [arrData]);
  return (
    <>
      <h1>Biểu đồ thống kê người dùng</h1>
      <div style={{ width: "800px" }}>
        <canvas id="acquisitions"></canvas>
      </div>
    </>
  );
}

export default ChartComponentUser;
