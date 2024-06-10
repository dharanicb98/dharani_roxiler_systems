const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/transactions', transactionRoutes);


const mongoUri = 'mongodb+srv://dharanicb:CbDharani%40143@cluster0.xppoe7h.mongodb.net/transactions?retryWrites=true&w=majority';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('MongoDB connection is started');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// connection.on('disconnected', () => {
//   console.log('MongoDB connection is disconnected');
// });
