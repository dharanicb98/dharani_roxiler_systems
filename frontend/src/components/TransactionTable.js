import React, { useState, useEffect } from "react";
import { fetchData, getTransactions } from "../services";
import { INPUT_STYLE } from "../constants";

const TransactionTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [transactionData, setTransactionsData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10; // Number of items per page

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions(month, search, page);
      const responseData = await fetchData();
      setTransactions(response);
      setTransactionsData(responseData);
    } catch (err) {
      console.log("error", err?.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const totalPages = Math.ceil(transactionData.length / perPage);

  const renderPagination = () => {
    return (
      <div className="flex gap-2 justify-center">
        <button
          className="bg-[#59665c] hover:bg-slate-700 text-white font-bold py-2 mx-3 my-3 px-4 rounded sm:text-[16px] self-center"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="bg-[#59665c] hover:bg-slate-700 text-white font-bold py-2 mx-3 my-3 px-4 rounded sm:text-[16px] self-center"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="">
      <div className="flex gap-4">
      <h2 className="self-center mx-10 font-bold text-gray-900">Transactions - {month}</h2>
      <input
        type="text"
        className={`${INPUT_STYLE}  w-[300px] my-3`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search transactions"
      />
      </div>
      <div className="flex flex-col justify-center items-center">
        <table className="border-2 border-solid border-black mx-10">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactionData
              ?.slice((page - 1) * perPage, page * perPage)
              .map((transaction, index) => (
                <tr key={transaction._id}>
                  <td>{transaction.title}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.price}</td>
                  <td>
                    {new Date(transaction.dateOfSale).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
};

export default TransactionTable;
