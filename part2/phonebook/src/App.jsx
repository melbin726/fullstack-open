import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  // States for the Notification system
  const [infoMessage, setInfoMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // Helper function to show notifications and reset them
  const showNotification = (message, type = "success") => {
    setInfoMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setInfoMessage(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    );

    if (existingPerson) {
      if (window.confirm(`${newName} is already added, replace number?`)) {
        const changedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnedPerson,
              ),
            );
            showNotification(`Updated ${returnedPerson.name}'s number`);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            // Exercise 2.17: Handle error if person was already deleted from server
            showNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              "error",
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
      return;
    }

    const personObject = { name: newName, number: newNumber };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      showNotification(`Added ${returnedPerson.name}`);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          showNotification(`Deleted ${name}`);
        })
        .catch((error) => {
          showNotification(
            `Information of ${name} was already removed from server`,
            "error",
          );
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={infoMessage} type={messageType} />

      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={handleDelete} />
    </div>
  );
};

export default App;
