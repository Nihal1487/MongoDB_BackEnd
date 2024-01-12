const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/race-api").then(console.log("Connection successfull............")).catch((e) =>{
    console.log(e);
})