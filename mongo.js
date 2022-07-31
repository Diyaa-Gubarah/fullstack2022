const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

console.log(`name: ${name} number: ${typeof number}`);

const url = `mongodb+srv://diyaa:${password}@cluster0.ersilop.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    const person = new Person({
      name: process.argv[3],
      number: +process.argv[4],
    });

    return person.save();
  })
  .then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));

// fetch all persons from the database
Person.find({}).then((result) => {
  console.log("phonebook:");
  result.forEach((person) => {
    console.log(`${person.name} ${person.number}`);
  });
  mongoose.connection.close();
});

// fetch persons with important = true
// Person.find({ important: true }).then((result) => {
//   result.forEach((person) => {
//     console.log(person);
//   });
//   mongoose.connection.close();
// });
