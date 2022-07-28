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

    const exist = persons.find((p) => p.name === info.name);

    if (checkIfEmpty(info.name, info.number)) {
      alert("Both name and number are required");
    } else if (exist) {
      // update person number if name already exists
      updatePerson(exist.id, newPerson);
    } else {
      // add new person to the phonebook
      addPerson(newPerson);
    }
  };

  const addPerson = (newPerson) => {
    phoneServices
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setFiltered(persons.concat(response.data));
        setInfo({ name: "", number: "" });
      })
      .catch((error) => {
        alert(`Failed to add ${newPerson.name}`);
      });
  };

  const deletePerson = (id) => {
    const copy = [...persons];

    const text = `Delete ${copy.find((p) => p.id === id).name}`;

    if (window.confirm(text) === true) {
      try {
        phoneServices.remove(id).then(() => {
          setPersons(copy.filter((person) => person.id !== id));
          setFiltered(copy.filter((person) => person.id !== id));
        });
      } catch (error) {
        alert(`Failed to delete ${info.name}`);
      }
    } else {
      alert(`Delete ${info.name} cancelled`);
    }
  };

  const updatePerson = (id, newPerson) => {
    const copy = [...persons];

    const text = `${info.name} is already added to phonebook, replace the old name with a new one`;

    if (window.confirm(text) === true) {
      phoneServices
        .update(id, newPerson)
        .then((person) => {
          setPersons([...copy.filter((p) => p.id !== id), person]);
          setFiltered([...copy.filter((p) => p.id !== id), person]);
        })
        .catch((error) => {
          alert(`Failed to update ${info.name}`);
        });
    } else {
      alert(`Update ${info.name} cancelled`);
    }
  };

  const onChangeName = (event) => {
    setInfo({ ...info, name: event.target.value });
  };

  const onChangeNumber = (event) => {
    setInfo({ ...info, number: event.target.value });
  };

  useEffect(() => {
    console.log("useEffect");
    phoneServices
      .getAll()
      .then((initialNotes) => {
        setPersons(initialNotes);
        setFiltered(initialNotes);
      })
      .catch((error) => {
        alert("error fetching data");
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
      <Persons persons={filter} onClick={deletePerson} />
    </div>
  );
};

export default App;
