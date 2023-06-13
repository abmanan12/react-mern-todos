require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose')
let mongo_URL = process.env.DB_URL
mongoose.connect(mongo_URL)

const TodoModel = require("./models/Todos")

app.use(express.json())


app.post('/createTodo', async (req, res) => {
    let todo = req.body
    const newTodo = new TodoModel(todo)

    try {
        await newTodo.save()
        res.json(todo)
    }
    catch (err) {
        res.json(err)
    }

})

app.get('/readTodo', async (req, res) => {
    let todos = await TodoModel.find()
    res.send(todos)
})

app.post('/updateTodo', async (req, res) => {
    let todo = req.body

    let data = { ...todo }
    delete data._id

    await TodoModel.findByIdAndUpdate(todo._id, data)
    res.send('Todo Updated')

})

app.post('/deleteTodo', async (req, res) => {
    let todo = req.body

    try {
        await TodoModel.findByIdAndDelete(todo._id)
        res.send('Todo Deleted')
    }
    catch {
        res.send('Something went wrong')
    }

})

app.listen(process.env.PORT, () => {
    console.log('Server is running at port: ', process.env.PORT);
})