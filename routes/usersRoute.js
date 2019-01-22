var createError = require("http-errors");
var express = require("express");
var router = express.Router();
var User = require("../models/userModel");
var _ = require("lodash");

/* GET users listing. */
router.get("/", function(req, res, next) {
  //res.send("respond with a resource");
  User.find()
    .sort({ created_date: -1 })
    .exec((err, data) => {
      if (err) console.log(err);
      //res.send(data);
      res.render("users", { users: data });
    });
});

router.post("/add", (req, res, next) => {
  //console.log(req.body);
  // Insert data
  var doc = new User(req.body);
  doc.save((err, data) => {
    if (err) console.log(err);
    res.redirect("/users");
  });
});

router.post("/search", function(req, res, next) {
  var search = _.omitBy(req.body, _.isEmpty);
  User.find(search, (err, data) => {
    res.render("users", { users: data });
  });
});

router.post("/delete/:_id", function(req, res, next) {
  //use model to remove
  User.findByIdAndRemove(req.params._id, (err, data) => {
    if (err) console.log(err);
    res.redirect("/users");
  });
});

router.get("/edit/:_id", function(req, res, next) {
  User.findById(req.params._id, (err, data) => {
    res.render("users", { user: data });
  });
});

router.post("/edit/:_id", function(req, res, next) {
  //Use model to edit
  User.findByIdAndUpdate(
    req.params._id,
    req.body,

    (err, data) => {
      if (err) console.log(err);
      res.redirect("/users");
    }
  );
});

module.exports = router;
