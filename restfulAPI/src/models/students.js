const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenngth: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Alredy exist"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  phone: {
    type: Number,
    // min: 10,
    // max: 20,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});


// create new  collection

const Student = new mongoose.model("Student",studentSchema)

module.exports  = Student