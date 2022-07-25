import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useState } from "react";

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

    if (exist) {
      alert(`${info.name} ${info.number} is already added to phonebook`);
    } else if (checkIfEmpty(info.name, info.number)) {
      alert("Both name and number are required");
    } else {
      setPersons(persons.concat(newPerson));
      setFiltered(persons.concat(newPerson));
      setInfo({ name: "", number: "", id: null });
    }
  };

  const onChangeName = (event) => {
    setInfo({ ...info, name: event.target.value });
  };

  const onChangeNumber = (event) => {
    setInfo({ ...info, number: event.target.value });
  };

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
