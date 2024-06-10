import React, { useState, useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getBarChart } from '../services';

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await getBarChart(month);
      setData(response);
    } catch (err) {
      console.log("error", err?.message);
    }
  };

  const chartData = {
    labels: data?.map(d => d.range),
    datasets: [{
      label: 'Number of Items',
      data: data?.map(d => d.count),
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }]
  };

  return <Bar data={chartData} />;
};

export default BarChart;
