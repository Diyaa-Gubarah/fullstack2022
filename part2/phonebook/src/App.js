import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneServices from "./services/phonebook";

const checkIfEmpty = (...arg) => arg.map((a) => a.length === 0).includes(true);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFiltered] = useState([]);
  const [info, setInfo] = useState({
    name: "",
    number: "",
  });

  const filterPersons = (e) => {
    const text = e.target.value;

    const copy = [...persons];

    const filteredPersons = text
      ? copy.filter((person) =>
          person.name.toLowerCase().includes(text.toLowerCase())
        )
      : [...persons];
    setFiltered(filteredPersons);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: info.name,
      number: info.number,
      id: persons.length + 1,
    };

    const exist = persons.find(
      (p) => p.name === info.name || p.number === info.number
    );

    phoneServices
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setFiltered(persons.concat(newPerson));
        setInfo({ name: "", number: "" });
      })
      .catch((error) => {
        alert(`${info.name} is already added to phonebook`);
      });

    if (exist) {
      alert(`${info.name} ${info.number} is already added to phonebook`);
    } else if (checkIfEmpty(info.name, info.number)) {
      alert("Both name and number are required");
    } else {
      phoneServices
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setFiltered(persons.concat(newPerson));
          setInfo({ name: "", number: "" });
        })
        .catch((error) => {
          alert(`${info.name} is already added to phonebook`);
        });
    }
  };

  const onChangeName = (event) => {
    setInfo({ ...info, name: event.target.value });
  };

  const onChangeNumber = (event) => {
    setInfo({ ...info, number: event.target.value });
  };

  useEffect(() => {
    phoneServices
      .getAll()
      .then((initialNotes) => {
        setPersons(initialNotes);
        setFiltered(initialNotes);

        console.log("initialNotes", initialNotes);
      })
      .catch((error) => {
        alert("error fetching data");
        console.log("error", error);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPersons={filterPersons} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={onSubmit}
        info={info}
        onChangeName={onChangeName}
        onChangeNumber={onChangeNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filter} />
    </div>
  );
};

export default App;
