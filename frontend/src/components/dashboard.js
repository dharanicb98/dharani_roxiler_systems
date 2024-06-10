import React, { useState } from 'react'
import TransactionTable from './TransactionTable';
import Statistics from './Statistics';
import { PieChart } from 'recharts';
import BarChartComponent from './BarChart';
import { INPUT_STYLE } from '../constants';
import PieChartComponent from './PieChart';

const Dashboard = () => {
    const [month, setMonth] = useState("03");

    return (
        <div>
          
          <div className="mt-20 h-screen">
            <div className="flex gap-4">
              <h2 className="self-center mx-10 font-bold text-gray-900">Select Months - {month}</h2>
              <select
                value={month}
                className={`${INPUT_STYLE} w-[300px] my-2`}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
    
            <TransactionTable month={month} />
            <Statistics month={month} />
            <BarChartComponent month={month} />
            <PieChartComponent month={month} />
          </div>
        </div>
      );
}

export default Dashboard
