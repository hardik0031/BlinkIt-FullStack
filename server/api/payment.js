// api/payment.js
const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const paymentRoute = require('../server/routes/paymentRoute');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/payment', paymentRoute);

module.exports = serverless(app);
