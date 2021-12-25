

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo_db');


const todoModel = mongoose.model('todos',{
    description: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: Date, required: true},
});

module.exports.Todo = todoModel;