const mongoose = require("mongoose");

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
  name: String,
  type: String,
  videos: Number,
  author: String,
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

    const result = await Playlist.insertMany([
      jsPlaylist,
      mongoPlaylist,
      expressPlaylist,
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// createDocument();

const getDocument = async () => {
  try {
    const result = await Playlist
      .find({$or : [{type: "Back-End"},{author: "mani"}] })
      .select({ name: 1, _id: 0 })
      // .limit(1);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// getDocument();


const updateDocument = async () => {
  try {
    const result = await Playlist.updateOne({type:"front-End"},{$set: {type:"Full-Stack"}} );
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}


// updateDocument()

const deleteDocument = async () => {
  try {
    const result = await Playlist.deleteMany({});
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

// deleteDocument()