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
  title: {
    type: String
  },
  items: {
    type: Array
  },
  answerDescript: {
    type: String
  },
  selectedAnswers: {
    type: Array
  },
  answerSelectPass: {
    answer01pass: {
      type: Number
      // required: true
    },
    answer02pass: {
      type: Number
      // required: true
    },
    answer03pass: {
      type: Number
      // required: true
    },
    answer04pass: {
      type: Number
      // required: true
    }
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
