const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/youtubeRegistration")
  .then(() => {
    console.log("Connection Successfull.....");
  })
  .catch((e) => {
    console.log(e);
  });
