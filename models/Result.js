const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ResultSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  questionId: {
    type: String
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
  selectedAnswers: {
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

module.exports = Result = mongoose.model("result", ResultSchema);
