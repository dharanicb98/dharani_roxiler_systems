import React, { useEffect, useState } from 'react';
import { fetchData } from '../services';
import ProductItems from './ProductItems';

const Products = () => {
  const [productData, setproductData] = useState([]);

  const fetchTransactions = async () => {
    try {
      const responseData = await fetchData();
      console.log("this product data", responseData);
      setproductData(responseData);
    } catch (err) {
      console.log("error", err?.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className='mt-20 h-screen overflow-auto'>
      <ul className='flex flex-wrap justify-center items-start'>
        {productData.length > 0 ? productData?.map((each) => (
          <ProductItems key={each?.id} products={each} />
        ))
        : (
          <p className='flex justify-center items-center text-gray-900 font-bold mx-10'>
            No Products available here
          </p>
        )}
      </ul>
    </div>
  );
};

export default Products;
