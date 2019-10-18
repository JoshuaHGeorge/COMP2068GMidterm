// set up routing w/express
const express = require('express');
const router = express.Router();

// reference the Task model
const Task = require('../models/task.js')

/* GET tasks index view */
router.get('/', (req, res, next) => {
    // use the task model to fetch a list of tasks and pass these to the view for display
    // if and error occurs, the err param will be filled
    // if no error occurs, the tasks param will be filled with the query result

    Task.find((err, tasks) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else{
            res.render('tasks/index', {
                tasks: tasks
            })
        }
    })
    res.render('tasks/index')
})

module.exports = router