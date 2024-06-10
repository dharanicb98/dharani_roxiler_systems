import React from "react";
import { Link } from "react-router-dom";

const Navber = () => {
  return (
    <header
      className="bg-[#59665c] text-white h-[70px] w-[100%] z-[10] flex justify-between items-center px-[20px] fixed top-0 left-0 right-0 shadow-sm"
      // style={{ backgroundColor: backgroundColor }}
    >
      <Link to={"/"}>
        <h1 className="text-white text-lg">Roxiler Systems</h1>
      </Link>
      <div className="flex gap-4">
      <Link to={"/"}> <h1 className="text-white text-lg">Dashboard</h1></Link>
        <Link to={"/barchat"}> <h1 className="text-white text-lg">BarChart</h1></Link>
        <Link to="/piechat"> <h1 className="text-white text-lg">PieChart</h1></Link>
        <Link to="/products"> <h1 className="text-white text-lg">Products</h1></Link>
      </div>
    </header>
  );
};

export default Navber;
