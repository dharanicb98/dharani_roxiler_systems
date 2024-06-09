import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/api/transactions/piechart?month=${month}`);
      setData(response.data);
    };

    fetchData();
  }, [month]);

  const chartData = {
    labels: data.map(d => d._id),
    datasets: [{
      label: 'Number of Items',
      data: data.map(d => d.count),
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)']
    }]
  };

  return <Pie data={chartData} />;
};

export default PieChart;
