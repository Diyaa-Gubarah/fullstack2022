const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    minLength: 20,
    required: true,
  },
}).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (document, returnedObject) {
    delete returnedObject._id;
  },
}); // toJSON is a function that is called when you convert a document to JSON (e.g. when you use JSON.stringify()).

module.exports = mongoose.model('Person', personSchema);
