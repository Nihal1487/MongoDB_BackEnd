const mongoose = require("mongoose");
const validator = require("validator");

// connection creation and creation a new db
mongoose
  .connect("mongodb://localhost:27017/NodeDB")
  .then(() => {
    console.log("Connection Successfull.....");
  })
  .catch((e) => {
    console.log(e);
  });

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    // uppercase: true
    trim: true,
    minlength: [2, "Minimun 2 cherector require"],
    maxlength: 41,
  },
  type: {
    type: String,
    required: true,
    // enum: ["frontend", "backend", "database"],
  },
  videos: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Videos count should not be negative");
      }
      // validate:{
      //   validator: function (value) {
      //     return value.length < 0
      //   },
      //   message:"Videos count should not be negative"
    },
  },
  author: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalide Email");
      }
    },
  },
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

// collection Creations

const Playlist = new mongoose.model("Playlist", playlistSchema);

// crate or insert document

const createDocument = async () => {
  try {
    const jsPlaylist = new Playlist({
      name: "JS",
      type: "front-End",
      videos: 187,
      author: "Mani",
      active: true,
    });
    const mongoPlaylist = new Playlist({
      name: "MongoDB",
      type: "Back-End",
      videos: 7,
      author: "Mani",
      active: true,
    });
    const expressPlaylist = new Playlist({
      name: "NodeJs",
      type: "Back-End",
      videos: 8,
      author: "nima",
      active: true,
    });

    const mongoosePlaylist = new Playlist({
      name: "      MonGOose  Js     ",
      type: "database",
      videos: 48,
      author: "nima",
      // email: "nniMA1487@go",
      email: "nima1487@gmail.com",
      active: true,
    });

    const result = await Playlist.insertMany([
      // jsPlaylist,
      // mongoPlaylist,
      // expressPlaylist,
      mongoosePlaylist,
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();

const getDocument = async () => {
  try {
    const result = await Playlist
      // .find({$or : [{type: "Back-End"},{author: "mani"}] })
      .find({ author: "Mani" })
      .select({ name: 1, _id: 0 })
      .sort({ name: -1 }); // . countDocuments();
    // .limit(1);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// getDocument();

const updateDocument = async () => {
  try {
    const result = await Playlist.updateOne(
      { type: "front-End" },
      { $set: { type: "Full-Stack" } }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// updateDocument();

const deleteDocument = async () => {
  try {
    const result = await Playlist.deleteMany({});
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// deleteDocument()

// Validation in  MogoDB
