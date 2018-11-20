const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const isEmpty = require("../../validation/is-empty");

// Storage strategy
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Multer initialized
const fileFilter = (req, file, cb) => {
  // Allowed ext
  const filetype = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetype.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetype.test(file.mimetype);

  if (mimetype && extname) {
    // console.log("file data is:", file);
    cb(null, true);
  } else {
    cb("Only Image (jpeg, jpg, png or gif)!");
    // cb(
    //   new Error(
    //     "Image format have to be jpeg, jpg, png or gif and size less than 500 KB!"
    //   )
    // );
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 0.5
  },
  fileFilter: fileFilter
}).single("reportImage");

// Report model
const Post = require("../../models/Report");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateReportInput = require("../../validation/report");

// @route   GET api/reports/test
// @desc    Tests report route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Reports Works" }));

// @route   POST api/reports
// @desc    Create report
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    upload(req, res, err => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        // console.log("Multer error:", err.message);
        const { errors } = validateReportInput(req.body);
        errors.reportImage = err.message;
        // If any errors, send 400 with errors object
        console.log("errors are:", errors);
        return res.status(400).json(errors);
      } else if (err) {
        const { errors } = validateReportInput(req.body);
        errors.reportImage = err;
        // If any errors, send 400 with errors object
        console.log("errors are:", errors);
        return res.status(400).json(errors);
      } else {
        // console.log("up loaded formData is:", req.body);
        // console.log("up loaded image is:", req.file);

        const { errors, isValid } = validateReportInput(req.body);

        // Check Validation
        if (!isValid) {
          // If any errors, send 400 with errors object
          console.log("errors are:", errors);
          return res.status(400).json(errors);
        }

        const imagePath = !isEmpty(req.file) ? req.file.path : null;

        const newReport = new Report({
          fedDate: req.body.fedDate,
          foodType: req.body.foodType,
          where: req.body.where,
          howManyDucks: req.body.howManyDucks,
          foodKind: req.body.foodKind,
          howMuchFood: req.body.howMuchFood,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
          // reportImage: req.file.path
          reportImage: imagePath
        });

        newReport.save().then(report => res.json(report));
      }
    });
  }
);

// @route   GET api/reports
// @desc    Get reports by user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (req.user.name.toLowerCase() !== "admin") {
        Report.find({ user: req.user.id })
          .sort({ date: -1 })
          .then(reports => {
            res.json(reports);
          })
          .catch(err =>
            res
              .status(404)
              .json({ noreportfound: "No report found for this user" })
          );
      } else {
        Report.find()
          .sort({ date: -1 })
          .then(reports => {
            // Show report
            res.json(reports);
          })
          .catch(err =>
            res.status(404).json({ noreportsfound: "No reports found" })
          );
      }
    });
  }
);
//--------------------

// @route   GET api/reports/:id
// @desc    Get report by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Report.findById(req.params.id)
        .then(report => {
          // Check for report owner
          if (
            report.user.toString() !== req.user.id &&
            req.user.name.toLowerCase() !== "admin"
          ) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          } else {
            // Show report
            res.json(report);
          }
        })
        .catch(err =>
          res
            .status(404)
            .json({ noreportfound: "No report found with that ID" })
        );
    });
  }
);

// @route   DELETE api/reports/:id
// @desc    Delete report
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Report.findById(req.params.id)
        .then(report => {
          // Check for report owner
          //------------
          console.log("User name is:", req.user);
          //---------
          if (
            //report.user.toString() !== req.user.id &&
            req.user.name.toLowerCase() !== "admin"
          ) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          report.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ reportnotfound: "No report found" })
        );
    });
  }
);

module.exports = router;
