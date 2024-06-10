const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/roxiler')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use('/api/transactions', transactionRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
