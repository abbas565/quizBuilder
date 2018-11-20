const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReportSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  //What time the ducks are fed
  fedDate: {
    type: Date,
    required: true
  },

  //What food the ducks are fed
  foodType: {
    type: String,
    required: true
  },

  //Where the ducks are fed
  where: {
    type: String,
    required: true
  },

  //How many ducks are fed
  howManyDucks: {
    type: Number,
    required: true
  },

  //What kind of food the ducks are fed
  foodKind: {
    type: String,
    required: true
  },

  //How much food the ducks are fed
  howMuchFood: {
    type: Number,
    required: true
  },

  name: {
    type: String
  },
  avatar: {
    type: String
  },
  dateOfReport: {
    type: Date,
    default: Date.now
  },
  reportImage: {
    type: String
  }
});

module.exports = Report = mongoose.model("report", ReportSchema);
