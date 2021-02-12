import { Router } from 'express';

import { checkAuth } from '../middleware';
import { Task, TaskData } from '../models';

export const tasksRoutes = Router();

tasksRoutes.get('', checkAuth, (_req, res) => {
  Task.find().then(tasks => {
    Task.countDocuments().then(count => {
      res.json({
        tasks,
        count
      });
    });
  });
});

tasksRoutes.get('/:id', checkAuth, (req, res) => {
  Task.findOne({ _id: req.params.id }).then(task => res.json(task));
});

tasksRoutes.post('', checkAuth, (req, res) => {
  const body: TaskData = req.body;
  const task = new Task({ ...body });
  task.save().then(savedTask => {
    res.json({ id: savedTask.id });
  });
});

tasksRoutes.delete('/:id', checkAuth, (req, res) => {
  Task.deleteOne({ _id: req.params.id }).then(() => res.sendStatus(200));
});
