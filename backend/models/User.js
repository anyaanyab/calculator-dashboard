// Mongoose schema for a User model

// Mongoose library imported, Schema constructor extracted
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema definition for a 'User'
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dashboardConfig: [{
    id: String,
    type: String,
    notes: String,
    position: Number,
    state: Schema.Types.Mixed
  }]
});

module.exports = mongoose.model('User', userSchema);