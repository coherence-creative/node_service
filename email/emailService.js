const sgMail = require("@sendgrid/mail");
const UserModel = require("../dbmodel");
const axios = require("axios");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const userWithSubs = [
//   {
//     email: "chay.arnold@gmail.com",
//     subs: [
//       "https://api.reddit.com/r/funny/top/",
//       "https://api.reddit.com/r/gaming/top/",
//       "https://api.reddit.com/r/worldnews/top/"
//     ]
//   },
//   {
//     email: "chayinvalid@gmail.com",
//     subs: [
//       "https://api.reddit.com/r/science/top/",
//       "https://api.reddit.com/r/oddlysatisfying/top/",
//       "https://api.reddit.com/r/askreddit/top/"
//     ]
//   }
// ];

const redditData = async subArray => {
  const dataArray = subArray.map(async sub => {
    const response = await axios.get(sub);
    const data = await response;
    let posts = data.data.data.children;
    let subName = `<h1>${sub}</h1>`;
    let postData = posts.map(post => {
      return (
        "<h3>" +
        post.data.title +
        "</h3>" +
        '<img src="' +
        post.data.thumbnail +
        '">' +
        "<br><br>"
      );
    });
    let template = `<div><div>${subName}</div><div>${postData}</div></div>`;
    return template;
  });
  const subData = await Promise.all(dataArray);
  const flatSubData = subData.join("");
  return flatSubData;
};

const sendEmail = async () => {
  let result = await UserModel.find().exec();
  result.forEach(async user => {
    console.log(user.subs);
    let email = {
      to: user.email,
      from: "chay.arnold@gmail.com",
      subject: "Reddit Email",
      text: "The Top Posts From All Your Favorite Subs",
      html: await redditData(user.subs)
    };
    try {
      // console.log(email);
      sgMail.send(email);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = sendEmail;
