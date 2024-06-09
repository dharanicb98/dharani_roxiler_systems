import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/api/transactions/barchart?month=${month}`);
      setData(response.data);
    };

    fetchData();
  }, [month]);

  const chartData = {
    labels: data.map(d => d.range),
    datasets: [{
      label: 'Number of Items',
      data: data.map(d => d.count),
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }]
  };

  return <Bar data={chartData} />;
};

export default BarChart;
