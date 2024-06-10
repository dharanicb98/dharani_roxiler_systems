import React, { useState, useEffect } from 'react';
import { getTransactions } from '../services';
import { INPUT_STYLE } from '../constants';

const TransactionTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchTransactions = async() => {
    try {
      const response = await getTransactions(month, search, page);
      setTransactions(response)
    }
    catch(err){
      console.log("error" , err?.message)
    }
  }
  
  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);
  

  return (
    <div>
      <input type="text" className={`${INPUT_STYLE} w-[40%] my-2`} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions" />
      <table className='border-2 border-solid border-black' >
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-[#007bff] hover:bg-slate-700 text-white font-bold py-2 mx-3 my-3 px-4 rounded sm:text-[16px] self-center" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button className="bg-[#007bff] hover:bg-slate-700 text-white font-bold py-2 mx-3 my-3 px-4 rounded sm:text-[16px] self-center"  onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default TransactionTable;
