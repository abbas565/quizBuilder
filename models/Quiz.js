const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuizSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  quizName: {
    type: String
  },
  selectedQueId: {
    type: Array
  },
  sQuestions: {
    type: Array
  },
  quizOwner: {
    type: String
  },
  avatar: {
    type: String
  },
  user: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Quiz = mongoose.model("quiz", QuizSchema);
