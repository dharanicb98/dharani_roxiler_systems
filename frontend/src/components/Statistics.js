import React, { useState, useEffect } from 'react';
import { getStatistics } from '../services';

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({ totalSales: 0, soldItems: 0, notSoldItems: 0 });

  useEffect(() => {
    fetchStatistics();
  }, [month]);


  const fetchStatistics = async() => {
    try {
      const response = await getStatistics(month);
      setStatistics(response)
    }
    catch(err){
      console.log("error" , err?.message)
    }
  }

  console.log("statistics" , statistics)

  return (
    <div className='flex flex-col mx-10'>
      <h1 className='font-bold text-gray-900'>Statistics</h1>
      <p>Total Sales: {statistics?.totalSales}</p>
      <p>Sold Items: {statistics?.soldItems}</p>
      <p>Not Sold Items: {statistics?.notSoldItems}</p>
    </div>
  );
};

export default Statistics;
