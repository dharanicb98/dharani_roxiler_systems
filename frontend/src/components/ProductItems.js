import React from "react";

const ProductItems = ({ products }) => {
  const { id, title, description, price, category, image } = products;
  return (
    <li className="bg-[#f0f0f0] p-4 font-[Roboto] text-[#212529] m-3 w-[30%] h-[400px] rounded-md max-h-fit flex flex-col  overflow-hidden">
      <div className="flex flex-col items-center">
        {/* <img src={image} alt={title} className="w-[150px]" /> */}
        <h1 className="text-[#212529] font-bold my-3 text-sm text-center">
          {title}
        </h1>
      </div>
      <div className="mx-3 py-4">
        <p className="text-sm text-gray-900">Price : {price} /-</p>
        <p className="text-sm text-gray-900">Category : {category} </p>
      </div>
      <p className="text-[12px] mx-3 overflow-hidden overflow-ellipsis self-end">
        {description}
      </p>
    </li>
  );
};

export default ProductItems;
