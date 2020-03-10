const sgMail = require("@sendgrid/mail");
const axios = require("axios");
// const subArray = [
//   "https://api.reddit.com/r/funny/top/",
//   "https://api.reddit.com/r/gaming/top/",
//   "https://api.reddit.com/r/worldnews/top/"
// ];
const resArray = [];
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const userWithSubs = [
  {
    email: "chay.arnold@gmail.com",
    subs: [
      "https://api.reddit.com/r/funny/top/",
      "https://api.reddit.com/r/gaming/top/",
      "https://api.reddit.com/r/worldnews/top/"
    ]
  },
  {
    email: "chayinvalid@gmail.com",
    subs: [
      "https://api.reddit.com/r/science/top/",
      "https://api.reddit.com/r/oddlysatisfying/top/",
      "https://api.reddit.com/r/askreddit/top/"
    ]
  }
];
let subsArray = [];

// const redditData = async arr => {
//   try {
//     for (const sub in arr) {
//       const response = await axios.get(arr[sub]);
//       const data = await response;
//       resArray.push({
//         sub: arr[sub],
//         data: data.data.data.children
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const redditData = async sub => {
  try {
    const response = await axios.get(sub);
    const data = await response;
    return {
      sub: sub,
      data: data.data.data.children
    };
  } catch (error) {
    console.log(error);
  }
};

// const emailMaker = async () => {
userWithSubs.forEach(async user => {
  // console.log(user.subs);
  let email = {
    user: user.email,
    // email: user.subs.map(async x => {
    //   const response = await axios.get(x);
    //   const data = await response;
    //   return data;
    // })
    email: user.subs.map(async x => {
      let response = await redditData(x);
      return response;
    })
  };

  subsArray.push(email);
  // let message = {
  //   to: user.email,
  //   from: "chay.arnold@gmail.com",
  //   subject: "Mass Email",
  //   html: ""
  // };
  // user.subs.forEach(async sub => {
  // console.log(sub);
  // const response = await redditData(sub);
  // subsArray.push(response);
  // console.log(response);
  // const response = await axios.get(sub);
  // const data = await response;
  // console.log(data);
  // console.log({
  //   sub: sub,
  //   data: data.data.data.children
  // });
  // subsArray.push({
  //   sub: sub,
  //   data: data.data.data.children
  // });
  // subsArray.push(data);
  // });
});
// }
console.log(subsArray);

// (async () => {
// const response = await emailMaker();
// console.log(response)
// let shuttup = {
//   title: resArray[0].data[0].data.title,
//   thumbnail: resArray[0].data[0].data.thumbnail,
//   link: resArray[0].data[0].data.permalink
// };
// console.log(resArray[0].data[0]);
// console.log(shuttup);
// })();

// const redditData = async () => {
//   const response = await axios.get("https://www.reddit.com/r/worldnews/top/");
//   const data = await response;
//   return data;
// };

// async function getReddit() {
//     try {
//         const response = await axios.get('https://api.reddit.com/r/funny/top/')
//         const data = await response
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }

// async function getReddit() {
//     let data;
//     // fetch data from a url endpoint
//     axios.get('https://api.reddit.com/r/funny/top/')
//       .then((result) => {
//         data = result
//       });
//     return data;
//   }

// (async () => {
//   const response = await redditData();
//   console.log(response);
// })();

// console.log(shuttup())

// const msg = {
//   to: 'chay.arnold@gmail.com',
//   from: 'chay.arnold@gmail.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

// sgMail.send(msg);
