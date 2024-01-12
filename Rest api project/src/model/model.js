const mongoose = require("mongoose");

const racerSchema = new mongoose.Schema({
  ranking: {
    type: Number,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true,
    unique: true,
    trim: true
  }, 
  country: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  event: {
    type: String,
    default: "100m",
    trim: true
  }
}); 

const Racer = mongoose.model("Racer", racerSchema);

module.exports = Racer;
