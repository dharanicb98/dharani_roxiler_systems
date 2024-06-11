import React, { useState, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getPieChart } from "../services";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await getPieChart(month);
      console.log("Pie Chart Data:", response); 
      setData(response);
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const pieData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="my-4 h-screen flex flex-col justify-center items-center">
      <h2 className="font-bold text-gray-900 mx-10">
        Pie Chart Stats - {month}
      </h2>
      {data.length > 0 ? (
        <div className="flex flex-col justify-center items-center">
           <Pie data={pieData} />
        </div>
      ) : (
        <p className="flex justify-center items-center text-gray-900 font-bold mx-10">
          No data available
        </p>
      )}
    </div>
  );
};

export default PieChartComponent;
