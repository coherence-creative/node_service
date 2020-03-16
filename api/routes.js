const express = require("express");
const router = express.Router();
const UserModel = require("../dbmodel");
const sendEmail = require("../email/emailService");

router.get("/subscribe", async (req, res) => {
  let email = req.body.email;
  try {
    let user = new UserModel({ email: email });
    let result = await user.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/update", async (req, res) => {
  let email = req.body.email;
  let sub = "https://api.reddit.com/r/" + req.body.sub + "/";
  //   let email = req.params.email;
  //   let sub = "https://api.reddit.com/r/" + req.params.sub + "/";
  try {
    let user = await UserModel.findOne({ email: email }).exec();
    let userSubs = user.subs;
    userSubs.push(sub);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(user);
  }
});

router.get("/unsubscribe", async (req, res) => {
  let email = req.body.email;
  try {
    var result = await PersonModel.deleteOne({ email: email }).exec();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
