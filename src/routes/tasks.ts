import { Router } from 'express';

import checkAuth from '../middleware/check-auth';
import Task, { Task as TaskData } from '../models/task';

const tasksRouter = Router();

tasksRouter.get('', checkAuth, (_req, res) => {
  Task.find().then(tasks => {
    Task.countDocuments().then(count => {
      res.json({
        tasks,
        count
      });
    });
  });
});

tasksRouter.get('/:id', checkAuth, (req, res) => {
  Task.findOne({ _id: req.params.id }).then(task => res.json(task));
});

tasksRouter.post('', checkAuth, (req, res) => {
  const body: TaskData = req.body;
  const task = new Task({ ...body });
  task.save().then(savedTask => {
    res.json({ id: savedTask.id });
  });
});

tasksRouter.delete('/:id', checkAuth, (req, res) => {
  Task.deleteOne({ _id: req.params.id }).then(() => res.sendStatus(200));
});

export default tasksRouter;
