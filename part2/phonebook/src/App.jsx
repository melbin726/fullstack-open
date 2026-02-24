import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  // Initialize with an empty array since data will come from the server
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  // Exercise 2.11: Fetching data from the server
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []); // The empty dependency array ensures this runs only once after the first render

  const addPerson = (event) => {
    event.preventDefault();

    const isDuplicate = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );

    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      // We removed the manual ID generation because json-server
      // will create a unique ID for us automatically!
    };

    // Exercise 2.12: Send data to the server
    axios
      .post("http://localhost:3001/persons", personObject)
      .then((response) => {
        // response.data contains the person object returned by the server
        // including the ID it generated
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
