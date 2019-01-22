var express = require("express");
var router = express.Router();
var User = require("../../models/userModel");
var _ = require("lodash");

// GET USERS
router.get("/", (req, res, next) => {
  User.find().exec((err, data) => {
    if (err) {
      return res
        .status(500)
        .send({ err: { message: err.message, code: err.code } });
    }

    res.status(200).send(data);
  });
});

// GET USERS BY ID
router.get("/:_id", (req, res, next) => {
  User.findById(req.params._id).exec((err, data) => {
    if (err) {
      return res
        .status(500)
        .send({ err: { message: err.message, code: err.code } });
    }

    res.status(200).send(data);
  });
});

// CREATE USER
router.post("/", (req, res, next) => {
  var doc = new User(req.body);
  doc.save((err, date) => {
    if (err) {
      return res
        .status(500)
        .send({ err: { message: err.message, code: err.code } });
    }
    res.status(200).send({ sucess: { message: "Created user successfully!" } });
  });
});

// DELETE USER
router.delete("/:_id", (req, res, next) => {
  User.findByIdAndRemove(req.params._id, (err, date) => {
    if (err) {
      return res
        .status(500)
        .send({ err: { message: err.message, code: err.code } });
    }
    res.status(200).send({ sucess: { message: "Deleted user successfully!" } });
  });
});

//UPDATE USER
router.put("/:_id", (req, res, next) => {
  User.findByIdAndUpdate(req.params._id, req.body, (err, date) => {
    if (err) {
      return res
        .status(500)
        .send({ err: { message: err.message, code: err.code } });
    }
    res.status(200).send({ sucess: { message: "Updated user successfully!" } });
  });
});

module.exports = router;
