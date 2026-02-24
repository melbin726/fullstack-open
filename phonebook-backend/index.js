const express = require('express')
const app = express()

// Middleware to parse JSON bodies from incoming requests
app.use(express.json())

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

app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/info', (request, response) => {
  const entries = persons.length
  const date = new Date()
  
  const content = `
    <p>Phonebook has info for ${entries} people</p>
    <p>${date}</p>
  `
  response.send(content)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

// Exercise 3.5: Adding a new person
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Check if content is missing (Validation comes in 3.6, but we'll start here)
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  // Generate a random ID (large range to avoid collisions)
  const randomId = Math.floor(Math.random() * 1000000)

  const person = {
    name: body.name,
    number: body.number,
    id: String(randomId)
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})