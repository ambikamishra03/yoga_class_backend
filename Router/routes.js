const express = require("express");
const User = require("../Models/user");
const router = express.Router();

const { userValidationRules, validate } = require("../Validator/user");

function getID() {
  let result = "";
  let hexChar = "0123456789ABCDEF";
  for (var i = 0; i < 4; i++) {
    result += hexChar.charAt(Math.floor(Math.random() * hexChar.length));
  }
  return result;
}

function CompletePayment(id) {
  //Some Function to accept Payment from User

  return true;
}

router.post("/user", userValidationRules(), validate, async (req, res) => {
  let id = getID();
  const newUser = new User({
    id: id,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    batch: req.body.batch,
  });
  await newUser.save();

  setTimeout(() => {
    res.send({ message: "Successfully Saved!!", body: newUser });
  }, 1500);
});

router.post("/find", async (req, res) => {
  let id = req.body.id;
  User.find({ id: id }, (err, user) => {
    if (user.length > 0) res.send({ status: true, body: user[0] });
    else res.send({ status: false });
  });
});

router.post("/fee", async (req, res) => {
  let id = req.body.id;
  if (CompletePayment(id))
    res.send({ status: true, message: "Payment Completed" });
  else res.send({ status: false, message: "Payment Incomplete" });
});

module.exports = router;
