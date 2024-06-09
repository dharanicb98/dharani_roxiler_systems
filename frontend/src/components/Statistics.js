import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({ totalSales: 0, soldItems: 0, notSoldItems: 0 });

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await axios.get(`http://localhost:3000/api/transactions/statistics?month=${month}`);
      setStatistics(response.data);
    };

    fetchStatistics();
  }, [month]);

  return (
    <div>
      <p>Total Sales: {statistics.totalSales}</p>
      <p>Sold Items: {statistics.soldItems}</p>
      <p>Not Sold Items: {statistics.notSoldItems}</p>
    </div>
  );
};

export default Statistics;
