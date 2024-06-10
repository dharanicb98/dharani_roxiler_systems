const express = require('express');
const router = express.Router();
const {
  fetchAndSeedData,
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
  getTestingData,
} = require('../controllers/transactionController');

router.get('/seed', fetchAndSeedData);
router.get('/list', listTransactions);
router.get('/statistics', getStatistics);
router.get('/barchart', getBarChart);
router.get('/piechart', getPieChart);
router.get('/combined', getCombinedData);
router.get('/testing', getTestingData);

module.exports = router;
