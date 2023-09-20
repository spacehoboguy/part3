const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        response.status(400).send({ error: 'Malformatted id' })
    } else if (error.name === 'Validation Error') {
        response.status(400).json({ error: error.message })
    }
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        const page = `Phonebook has info for ${persons.length} people<br>${new Date()}`
        res.send(page)
    })
})

app.get('/api/persons', (req, res) => { // GET Persons
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => { // GET Person
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons/', (req, res, next) => {
    const body = req.body

    if (body.name === undefined) {
        return res.status(400).json({
            error: "name missing"
        })
    } else if (body.number === undefined) {
        return res.status(400).json({
            error: "number missing"
        })
    }
    
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person
        .save().then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    const person = {
        name, number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => { // DELETE Person
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => { // GET Info
    const entries = persons.length;
    const date = new Date()
    res.send(`Phonebook has info for ${entries} people. </br> ${date}`)
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`)
})