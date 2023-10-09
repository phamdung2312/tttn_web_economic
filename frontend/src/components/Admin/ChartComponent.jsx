import Chart from "chart.js/auto";
import { useEffect } from "react";
import "chartjs-plugin-datalabels";
function ChartComponent({ arrData }) {
  console.log("arrData", arrData);
  // biểu đồ
  const groupedOrders = arrData?.reduce((result, order) => {
    const day = order.day;
    const price = order.price;
    result[day] = (result[day] || 0) + price;
    return result;
  }, {});
  const sumOrders = Object.keys(groupedOrders).map((day) => ({
    day: day,
    price: groupedOrders[day],
  }));
  useEffect(() => {
    new Chart(document.getElementById("acquisitions"), {
      type: "bar",
      data: {
        labels: sumOrders.map((row) => row.day),
        datasets: [
          {
            label: "Doanh thu",
            data: sumOrders.map((row) => row.price),
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
      <h1>Biểu đồ thống kê doanh thu</h1>
      <div style={{ width: "800px" }}>
        <canvas id="acquisitions"></canvas>
      </div>
    </>
  );
}

export default ChartComponent;
