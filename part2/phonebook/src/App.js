import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import Notification from "./components/Notification";
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

  const [errorMessage, setErrorMessage] = useState({
    message: null,
    className: "",
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
      showNotification("Both name and number are required");
    } else if (exist) {
      // update person number if name already exists
      updatePerson(exist.id, newPerson);
    } else {
      // add new person to the phonebook
      addPerson(newPerson);
    }
  };

  /*
   * show notification if errorMessage is not empty
   */
  const showNotification = (message) => {
    setErrorMessage(message);
  };

  /*
   * Add new person to the phonebook
   */
  const addPerson = (newPerson) => {
    const copy = [...persons];

    phoneServices
      .create(newPerson)
      .then((data) => {
        setPersons(copy.concat(data));
        setFiltered(copy.concat(data));
        setInfo({ name: "", number: "" });
        showNotification({
          message: `${newPerson.name} added to the phonebook`,
          className: "success",
        });
      })
      .catch((error) => {
        showNotification({
          message: `Failed to add ${newPerson.name}`,
          className: "error",
        });
      });
  };

  /*
   * Delete person from phonebook
   */
  const deletePerson = (id) => {
    const copy = [...persons];

    let text = `Delete ${copy.find((p) => p.id === id).name}`;

    if (window.confirm(text) === true) {
      phoneServices
        .remove(id)
        .then(() => {
          setPersons(copy.filter((person) => person.id !== id));
          setFiltered(copy.filter((person) => person.id !== id));
          showNotification({
            message: `${
              copy.find((p) => p.id === id).name
            } deleted from the phonebook`,
            className: "success",
          });
        })
        .catch((error) => {
          showNotification({
            message: `Failed to delete ${copy.find((p) => p.id === id).name}`,
            className: "error",
          });
        });
    } else {
      showNotification({
        message: `${copy.find((p) => p.id === id).name} not found.`,
        className: "error",
      });
    }
  };

  /*
   * Update person number in phonebook if name already exists
   */
  const updatePerson = (id, newPerson) => {
    const copy = [...persons];

    const text = `${info.name} is already added to phonebook, replace the old name with a new one`;

    if (window.confirm(text) === true) {
      phoneServices
        .update(id, newPerson)
        .then((person) => {
          setPersons([...copy.filter((p) => p.id !== id), person]);
          setFiltered([...copy.filter((p) => p.id !== id), person]);
          setInfo({ name: "", number: "" });
          showNotification({
            message: `${newPerson.name} updated in the phonebook`,
            className: "success",
          });
        })
        .catch((error) => {
          console.log('update error: ', error);

          showNotification({
            message: `Failed to update ${newPerson.name}`,
            className: "error",
          });
        });
    } else {
      showNotification({
        message: `Failed to update ${newPerson.name}`,
        className: "error",
      });
    }
  };

  const onChangeName = (event) => {
    setInfo({ ...info, name: event.target.value });
  };

  const onChangeNumber = (event) => {
    setInfo({ ...info, number: event.target.value });
  };

  /*
   * Fetch all persons from phonebook
   */
  useEffect(() => {
    setErrorMessage({ message: null, className: "" });
    phoneServices
      .getAll()
      .then((initialNotes) => {
        setPersons(initialNotes);
        setFiltered(initialNotes);
      })
      .catch((error) => {
        console.log('error: ', error);
        showNotification({
          message: `Failed to fetch phonebook`,
          className: "error",
        });
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageObj={errorMessage} />

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
