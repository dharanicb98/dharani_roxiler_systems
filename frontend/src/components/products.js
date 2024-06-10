import React, { useEffect, useState } from 'react'
import { fetchData } from '../services';
import ProductItems from './ProductItems';

const Products = () => {
    const [productData, setproductData] = useState([]);

    const fetchTransactions = async () => {
        try {
          const responseData = await fetchData();
          console.log("this product data" , responseData)
          setproductData(responseData);
        } catch (err) {
          console.log("error", err?.message);
        }
      };

      useEffect(() => {
        fetchTransactions();
      }, []);

  return (
    <div className='mt-10 h-screen'>
      <ul className='flex flex-wrap justify-center items-center'>
            {productData?.map((each)=> (
                <ProductItems key={each?.id} products = {each}/>
            ))}
      </ul>
    </div>
  )
}

export default Products
