const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    res.render('index');
});

router.post('/tasks', async (req, res) => {    
    const task = new Task(req.body);
    await task.save();

    res.json({status:'success'});
});

router.get('/tasks', async (req, res) => {
    const tasks = await Task.find().sort('-createdAt');
    res.json(tasks);
});

router.get('/tasks/:id/turn', async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();

    res.json({status:'success'});
});

router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    await Task.remove({_id: id});

    res.json({status:'success'});
});

router.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id);

    res.json(task);
});

router.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    await Task.update({_id: id}, req.body)

    res.json({status:'success'});
});


module.exports = router;