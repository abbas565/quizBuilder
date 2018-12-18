const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ExamSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  ExamName: {
    type: String
  },
  selectedStuId: {
    type: Array
  },
  sStudents: {
    type: Array
  },
  examOwner: {
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

module.exports = Exam = mongoose.model("exam", ExamSchema);
