const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const questions = require("./routes/api/questions");
const quizzes = require("./routes/api/quizzes");
const exams = require("./routes/api/exams");
const results = require("./routes/api/results");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/questions", questions);
app.use("/api/quizzes", quizzes);
app.use("/api/exams", exams);
app.use("/api/results", results);

// ---Access uploads folder
app.use("/uploads", express.static("uploads"));

// app.get("/", (req, res) => res.send("Hello World"));

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4500;

app.listen(port, () => console.log(`Server running on port ${port}`));
