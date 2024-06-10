import React, { useState, useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getPieChart } from '../services';

// Register the necessary components
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await getPieChart(month);
      setData(response);
    } catch (err) {
      console.log("error", err?.message);
    }
  };

  const chartData = {
    labels: data?.map(d => d._id),
    datasets: [{
      label: 'Number of Items',
      data: data?.map(d => d.count),
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)']
    }]
  };

  return <Pie data={chartData} />;
};

export default PieChart;
