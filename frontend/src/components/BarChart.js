import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getBarChart } from '../services';

const BarChartComponent = ({ month }) => {
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

console.log("this barchat" , data)

  return (
    <div className='h-screen flex justify-center items-center my-4'>
      <h1 className='font-bold text-gray-900'>BarChart</h1>
      <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
    </div>
  );
};

export default BarChartComponent;