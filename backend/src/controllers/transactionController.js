const axios = require('axios');
const Transaction = require('../models/Transaction');

const fetchAndSeedData = async (req, res) => {
  const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
  await Transaction.deleteMany({});
  await Transaction.insertMany(response.data);
  res.send('Database seeded');
};

const listTransactions = async (req, res) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;
  const startDate = new Date(`2021-${month}-01`);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

  const query = {
    dateOfSale: { $gte: startDate, $lt: endDate },
    $or: [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { price: new RegExp(search, 'i') }
    ]
  };

  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(Number(perPage));

  res.json(transactions);
};

const getStatistics = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2021-${month}-01`);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

  const soldItems = await Transaction.countDocuments({ dateOfSale: { $gte: startDate, $lt: endDate }, sold: true });
  const notSoldItems = await Transaction.countDocuments({ dateOfSale: { $gte: startDate, $lt: endDate }, sold: false });
  const totalSales = await Transaction.aggregate([
    { $match: { dateOfSale: { $gte: startDate, $lt: endDate }, sold: true } },
    { $group: { _id: null, total: { $sum: '$price' } } }
  ]);

  res.json({
    totalSales: totalSales[0] ? totalSales[0].total : 0,
    soldItems,
    notSoldItems
  });
};

const getBarChart = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2021-${month}-01`);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

  const priceRanges = [
    { range: '0-100', min: 0, max: 100 },
    { range: '101-200', min: 101, max: 200 },
    { range: '201-300', min: 201, max: 300 },
    { range: '301-400', min: 301, max: 400 },
    { range: '401-500', min: 401, max: 500 },
    { range: '501-600', min: 501, max: 600 },
    { range: '601-700', min: 601, max: 700 },
    { range: '701-800', min: 701, max: 800 },
    { range: '801-900', min: 801, max: 900 },
    { range: '901-above', min: 901, max: Infinity }
  ];

  const data = await Promise.all(priceRanges.map(async (range) => {
    const count = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      price: { $gte: range.min, $lte: range.max }
    });
    return { range: range.range, count };
  }));

  res.json(data);
};

const getPieChart = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`2021-${month}-01`);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

  const categories = await Transaction.aggregate([
    { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);

  res.json(categories);
};

const getCombinedData = async (req, res) => {
  const statistics = await getStatistics(req, res);
  const barChart = await getBarChart(req, res);
  const pieChart = await getPieChart(req, res);

  res.json({ statistics, barChart, pieChart });
};

module.exports = {
  fetchAndSeedData,
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData
};
