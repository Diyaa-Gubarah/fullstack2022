const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 7,
    maxLength: 20,
    required: true,
  },
  author: {
    type: String,
    minLength: 7,
    maxLength: 20,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: { type: Number, default: 0, required: true, min: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}).set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (document, returnedObject) {
    delete returnedObject._id;
  },
}); // toJSON is a function that is called when you convert a document to JSON (e.g. when you use JSON.stringify()).

module.exports = mongoose.model("Blog", blogSchema);
