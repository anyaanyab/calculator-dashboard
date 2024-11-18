// Module for establishing a connection to MongoDB
// Done with Mongoose - library for MongoDB and Node.js

// Mongoose library import
const mongoose = require('mongoose');

// Asynchronous function defined 
const connectDB = async () => {
  // Connection to MongoDB database attempt; URI obtained
  const conn = await mongoose.connect(process.env.MONGO_URI);
  // Message logged to the console in case of successful connection
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;