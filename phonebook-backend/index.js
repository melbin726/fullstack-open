const express = require('express')
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Root route
app.get('/', (request, response) => {
  response.send('<h1>Phonebook Backend</h1>')
})

// Exercise 3.1: Return hardcoded list of persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Exercise 3.2: Info page
app.get('/info', (request, response) => {
  const entries = persons.length
  const date = new Date()
  
  const content = `
    <p>Phonebook has info for ${entries} people</p>
    <p>${date}</p>
  `
  response.send(content)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})