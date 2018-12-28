const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  mainText: {
    type: String
    // required: true
  },
  referenceBook: {
    type: String
    // required: true
  },
  questionType: {
    type: Number
    // required: true
    // Number 1 is Multiple Choices Question
    // Number 2 is Single Choice Question
    // Number 3 is Short Answer/Essay Question
  },
  answers: {
    answer01: {
      ansText: {
        type: String
        // required: true
      },
      ansCorrect: {
        type: Boolean
        // required: true
      },
      point: {
        type: Number
      }
    },
    answer02: {
      ansText: {
        type: String
        // required: true
      },
      ansCorrect: {
        type: Boolean
        // required: true
      },
      point: {
        type: Number
      }
    },
    answer03: {
      ansText: {
        type: String
        // required: true
      },
      ansCorrect: {
        type: Boolean
        // required: true
      },
      point: {
        type: Number
      }
    },
    answer04: {
      ansText: {
        type: String
        // required: true
      },
      ansCorrect: {
        type: Boolean
        // required: true
      },
      point: {
        type: Number
      }
    }
  },
  courseId: {
    type: String
    // required: true
  },
  courseLevel: {
    type: Number
    // required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  questionImage: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Question = mongoose.model("question", QuestionSchema);
