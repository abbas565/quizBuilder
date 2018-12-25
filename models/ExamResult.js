const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ExamResultSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  examId: {
    type: String
  },
  examRunId: {
    type: String
  },
  studentId: {
    type: String
  },
  results: {
    type: Array
  },
  user: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ExamResult = mongoose.model("examresult", ExamResultSchema);
