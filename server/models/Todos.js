const mongoose = require('mongoose')

const TodosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

const TodoModel = mongoose.model('todos', TodosSchema)

module.exports = TodoModel