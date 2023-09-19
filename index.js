const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const Person = require('./models/person')

app.use(cors())
app.use(express.json())
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
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => { // GET Person
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})
const generateId = () => {
    const id = Math.floor(Math.random() * 10001);
    return id
}

app.post('/api/persons/', (req, res) => {
    const body = req.body

    if (body.name === undefined) {
        return res.status(400).json({
            error: "name missing"
        })
    } else if (body.number === undefined) {
        return res.status(400).json({
            error: "number missing"
        })
    } else if (persons.find(p => p.name === body.name)) { // returns truthy
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (req, res) => { // DELETE Person
    Person.findByIdAndDelete(req.params.id).then(person => {
        res.json(person)
    })
})

app.get('/info', (req, res) => { // GET Info
    const entries = persons.length;
    const date = new Date()
    res.send(`Phonebook has info for ${entries} people. </br> ${date}`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`)
})