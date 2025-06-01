const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      family: 4, // Use IPv4, skip IPv6
    });
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(`Database connection error: ${err.message}`);
    // Exit with failure code
    process.exit(1);
  }
};

// Add event listeners
mongoose.connection.on('connecting', () => {
  logger.debug('Attempting to establish MongoDB connection...');
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});

module.exports = connectDB;