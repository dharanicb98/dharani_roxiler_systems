import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Navber from '../components/Navber';
import Dashboard from '../components/dashboard';
import BarChartComponent from '../components/BarChart';
import PieChartComponent from '../components/PieChart';
import Products from '../components/products';


const ProtectedRoutes = () => {
    const [month, setMonth] = useState("03");
    
  return (
    <div>
        <Navber />
       <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/barchat" element={<BarChartComponent  month={month}/>} />
          <Route path="/piechat" element={<PieChartComponent  month={month} />} />
          <Route path="/products" element={<Products />} />
        </Routes>
    </div>
  )
}

export default ProtectedRoutes
