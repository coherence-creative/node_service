const express = require('express')
const router = express.Router()
const axios = require("axios")

router.get("/test", (req, res) => {
    res.send("butts")
})

router.get("/subscribe/:email", async (req, res) => {
    let email = req.params.email
    
    const response = await axios.post("https://node-service-aa18b.firebaseio.com/users.json", { "email": email })
    const data = await response
    console.log(data)
    res.send("Subscribed!")
})

router.get("/update/:email", async (req, res) => {
    let email = req.params.email
    // let sub = req.params.sub
    const response = await axios.get("https://node-service-aa18b.firebaseio.com/data.json")
    const data = await response
    // res.send(data)
    console.log(data.data)
    res.send("Working on it")
    // data.map(data => {
    //     if (data === this.email) {
    //         console.log("Found")
    //         res.send("Found")
    //     } else {
    //         console.log("Not Found")
    //         res.send("Not Found")
    //     }
    // })
})

module.exports = router;
