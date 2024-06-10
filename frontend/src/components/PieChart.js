import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { getPieChart } from '../services';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const PieChartComponent = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await getPieChart(month);
      console.log("Pie Chart Data:", response); // Check the data received from the API
      setData(response);
    } catch (err) {
      console.log("error", err?.message);
    }
  };

  return (
    <div className='my-4 h-screen flex flex-col justify-center items-center'>
      <h2 className='font-bold text-gray-900 mx-10'>Pie Chart Stats - {month}</h2>
      {data.length > 0 ? ( // Check if data is not empty
      <div className='flex flex-col justify-center items-center'>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="count"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        </div>
      ) : (
        <p className='flex justify-center items-center text-gray-900 font-bold mx-10'>No data available</p> // Display message when data is empty
      )}
    </div>
  );
};

export default PieChartComponent;
