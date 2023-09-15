const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('dist'))


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => { // GET Persons
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => { // GET Person
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (!person) {
        res.status(404).end()
    } else {
        res.json(person)
    }
})
const generateId = () => {
    const id = Math.floor(Math.random() * 10001);
    return id
}

app.post('/api/persons/', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: "name missing"
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: "number missing"
        })
    } else if (persons.find(p => p.name === body.name)) { // returns truthy
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => { // DELETE Person
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end();
})

app.get('/info', (req, res) => { // GET Info
    const entries = persons.length;
    const date = new Date()
    res.send(`Phonebook has info for ${entries} people. </br> ${date}`)
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`)
})