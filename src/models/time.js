const { Schema, model } = require("mongoose");

const Time = new Schema({
  time: {
    type: String,
    trim: true,
  },
  fibonacciSeries: {
    type: Array,
    default: [],
  },
});

Time.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Time", Time);