const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: Boolean, default: true },
  username: { type: String, required: true},
});

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;


