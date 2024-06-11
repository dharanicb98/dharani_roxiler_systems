import axios from 'axios';

const baseUrl = process.env.baseUrl || "http://localhost:5000/transactions";

const getBarChart = async (month) => {
  const response = await axios.get(`${baseUrl}/barchart?month=${month}`);
  return response.data;
};

const getPieChart = async (month) => {
  const response = await axios.get(`${baseUrl}/piechart?month=${month}`);
  console.log(response, "this is piechat")
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

const fetchCombinedData = async (month) => {
  try {
    const response = await axios.get(`${baseUrl}/combined`, {
      params: { month },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching combined data:', error);
    throw error;
  }
};

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/transactions');
    const data = response.data;
    return data 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export { getBarChart, getPieChart, getStatistics, getTransactions,fetchCombinedData , fetchData};
