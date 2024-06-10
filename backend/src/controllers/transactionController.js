const axios = require("axios");
const Transaction = require("../models/Transaction");

const fetchAndSeedData = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    // await Transaction.deleteMany({});
    // await Transaction.insertMany(response.data);
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTestingData = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    // console.log("this backend data" , transactions)
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listTransactions = async (req, res) => {
  try {
    const { month, search = "", page = 1, perPage = 10 } = req.query;

    if (!month || !/^(0[1-9]|1[0-2])$/.test(month)) {
      return res.status(400).json({ message: "Invalid month parameter" });
    }

    const startDate = new Date(`2021-${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const query = {
      dateOfSale: { $gte: startDate, $lt: endDate },
      $or: [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ],
    };

    if (!isNaN(search)) {
      query.$or.push({ price: Number(search) });
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.json(transactions);
  } catch (error) {
    console.error("Error in listTransactions:", error);
    res.status(500).json({ message: error.message });
  }
};


const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(`2021-${month}-01`);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    const soldItems = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      sold: true,
    });
    const notSoldItems = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      sold: false,
    });
    const totalSales = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate }, sold: true } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    res.json({
      totalSales: totalSales[0] ? totalSales[0].total : 0,
      soldItems,
      notSoldItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBarChart = async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(`2021-${month}-01`);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const data = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await Transaction.countDocuments({
          dateOfSale: { $gte: startDate, $lt: endDate },
          price: { $gte: range.min, $lte: range.max },
        });
        return { range: range.range, count };
      })
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPieChart = async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(`2021-${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    const categories = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.json(categories);
  } catch (error) {
    console.error('Error in getPieChart:', error);
    res.status(500).json({ message: error.message });
  }
};


const getCombinedData = async (req, res) => {
  try {
    const statistics = await getStatistics(req, res);
    const barChart = await getBarChart(req, res);
    const pieChart = await getPieChart(req, res);

    res.json({ statistics, barChart, pieChart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  fetchAndSeedData,
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
  getTestingData,
};
