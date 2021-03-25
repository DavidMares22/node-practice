const { Schema, model } = require("mongoose");

const course = new Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: String,
});

module.exports = model("Course", course);
