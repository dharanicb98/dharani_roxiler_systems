import React from "react";

const ProductItems = ({products}) => {
  const { id, title, description, price, category, image } = products;
  return (
    <li className="bg-[#f0f0f0] bg-cover px-4 py-4 font-[Roboto] text-[#212529] mt-10 my-3 mx-3 w-[30%] max-h-fit">
    <div className="h-full">
    <div className="flex flex-col items-center">
        {/* <img src={image} alt={title} className="w-[150px]" /> */}
        <h1 className="text-[#212529] font-bold my-3  text-sm font-[Roboto]">
          {title}
        </h1>
      </div>
      <div className="mx-3 py-4">
        <p className="text-sm text-gray-900">Price : {price} /-</p>
        <p className="text-sm text-gray-900">Category : {category} </p>
      </div>
      <p className="text-sm mx-3">{description} </p>
    </div>
    </li>
  );
};

export default ProductItems;
