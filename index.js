require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const TodoModel = require('./Models/Todo');
const databaseconnection = require('./database/database');

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

databaseconnection();

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => console.log(err))
})
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => console.log(err));
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({ task: task })
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
