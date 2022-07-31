require('dotenv').config();

const Person = require('./models/phonebook');

const express = require('express');
let morgan = require('morgan');
const cors = require('cors');

const app = express();

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  switch (error.name) {
    case 'CastError':
      response.status(400).send({ error: 'malformatted id' });
      break;
    case 'ValidationError':
      response.status(400).json({ error: error.message });
      break;
    case 'ReferenceError:':
      response.status(400).json({ error: 'not found' });
      break;
    default:
      response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(express.json());
app.use(express.static('build'));

app.use(cors());

// create custom middleware using morgan
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body), // show the body of the request
    ].join(' ');
  })
);

// GET /api/persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});



// GET /api/persons/:id
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
      console.log(error);
      response.status(400).send({ error: `Person not found.` });
    });
});

// DELETE /api/persons/:id
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then((person) => {
      if (person) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// POST /api/persons

app.post('/api/persons', (request, response,next) => {
  const body = request.body;
  const name = body.name;
  const number = body.number;

  const person = new Person({
    number: number,
    name: name,
  });

  person
    .save()
    .then((savePerson) => {
      response.json(savePerson);
    })
    .catch((error) => next(error));
});

// PUT /api/persons/:id
app.put('/api/persons/:id', (request, response,next) => {
  const body = request.body;
  const name = body.name;
  const number = body.number;
  const id = request.params.id;

  const person = {
    name: name,
    number: number,
  };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));

  // Person.find({ name: name })
  //   .then((person) => {
  //     console.log(person);
  //     if (person) {
  //       response.status(400).json({ error: 'Name must be unique' });
  //     } else {
  //       Person.findByIdAndUpdate(id, person, { new: true })
  //         .then((updatedPerson) => {
  //           response.json(updatedPerson);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           next(error);
  //         });
  //     }
  //   })
  //   .catch((error) => {
  //     next(error);
  // });
});

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
