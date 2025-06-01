require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Route files
const auth = require('./routes/authRoutes');
const users = require('./routes/userRoutes');
const products = require('./routes/productRoutes');
const categories = require('./routes/categoryRoutes');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/categories', categories);

// Error handling middleware
app.use(require('./middlewares/errorHandler'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});