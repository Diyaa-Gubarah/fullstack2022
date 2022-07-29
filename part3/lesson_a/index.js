const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// GET home page
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// GET /api/persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// GET /info
app.get("/info", (request, response) => {
  const date = new Date();
  const content = "Phonebook has info for " + persons.length + " people";
  response.send(`<h1>${content}</h1> <br/> <h1>${date}</h1>`);
});

// GET /api/persons/:id
app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.send(`Person with id ${id} not found.`);
  }
});

// DELETE /api/persons/:id
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

// POST /api/persons
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const name = body.name;
  const number = body.number;

  if (!name) {
    return response.status(400).json({ error: "Name is required" });
  }

  if (!number) {
    return response.status(400).json({ error: "Number is required" });
  }

  if (persons.some((person) => person.name === name)) {
    return response.status(400).json({ error: "Name must be unique" });
  }

  const person = {
    number: number,
    name: name,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
