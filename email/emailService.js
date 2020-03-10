const sgMail = require('@sendgrid/mail');
const axios = require("axios")

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const redditData = async () => {
    const response = await axios.get('https://api.reddit.com/r/funny/top/')
    const data = await response
    return data.data.data.children
}

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

// shuttup = async () => {
//     const res = await redditData()
//     return res
// }

(async () => {
    const response = await redditData();
    console.log(response);
  })();

// console.log(shuttup())

// const msg = {
//   to: 'chay.arnold@gmail.com',
//   from: 'chay.arnold@gmail.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

// sgMail.send(msg);
