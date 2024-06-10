import axios from 'axios';

const baseUrl = "http://localhost:5000/transactions";

const getBarChart = async (month) => {
  const response = await axios.get(`${baseUrl}/barchart?month=${month}`);
  return response.data;
};

const getPieChart = async (month) => {
  const response = await axios.get(`${baseUrl}/piechart?month=${month}`);
  return response.data;
};

const getStatistics = async (month) => {
  const response = await axios.get(`${baseUrl}/statistics?month=${month}`);
  return response.data;
};

const getTransactions = async (month, search, page) => {
  const response = await axios.get(`${baseUrl}/list?month=${month}&search=${search}&page=${page}`);
  return response.data;
};

const getChartTransaction = async (month) => {
  const response = await axios.get(`${baseUrl}/testing`);
  return response;
};

export { getBarChart, getPieChart, getStatistics, getTransactions,getChartTransaction };
