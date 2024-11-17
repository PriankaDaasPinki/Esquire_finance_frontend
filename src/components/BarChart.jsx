import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BarChart = () => {
  // Sample data for the doughnut chart
  const data = {
    labels: ["Label 1", "Label 2", "Label 3","Label 4", "Label 5","Label 6"],
    datasets: [
      {
        data: [20, 20, 10,20, 20, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56","#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56","#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    cutout: 80,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };
  

  return <Doughnut data={data} options={options} />;
};

export default BarChart;
