const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(cors())

morgan.token('req-body', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :req-body', {

      stream: process.stdout,
    })
  )

app.use(express.json())


let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
  ]



app.get('/api/persons', (request, response) => {
  response.json(persons)
})




app.get('/info', (request, response) => {
    const personsCount = persons.length

    const currentDate = new Date()

    response.send(`<p>Phonebook has info for ${personsCount} people</p><p>${currentDate}</p>`)
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(note => note.id === id)
    
  
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


const generateId = () => {
    const min = 100000
    const max = 100000000
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  
app.post('/api/persons', (request, response) => {
    const body = request.body
    const nameExists = persons.some(item => item.name === body.name)

  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
    }
    if (nameExists) {
        return response.status(400).json({ 
            error: 'name must be unique'
          })
    }
    else {
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(persons)
  
    response.json(person)
    }
  })

const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })