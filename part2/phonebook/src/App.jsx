import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    // Check if the person already exists
    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    );

    if (existingPerson) {
      // Exercise 2.15: Confirm update if person exists
      const ok = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );

      if (ok) {
        const changedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            // Update the state: replace only the updated person
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : returnedPerson,
              ),
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            alert(
              `The person '${existingPerson.name}' was already deleted from server`,
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
      return;
    }

    // If person doesn't exist, create new
    const personObject = { name: newName, number: newNumber };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
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
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        numberValue={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={handleDelete} />
    </div>
  );
};

export default App;
