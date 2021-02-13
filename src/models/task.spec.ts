import { expect } from 'chai';

import { setup } from '../test/setup';
import { Task, TaskData } from './task';

const task: TaskData = {
  task: 'Test Task',
  comments: 'With comments'
};

describe('task model', () => {
  setup();

  let taskId: string;

  it('can create a task', async () => {
    const taskDoc = new Task({ ...task });
    const createdTask = await taskDoc.save();
    expect(createdTask).to.have.property('_id');
    taskId = createdTask.id;
    const count = await Task.countDocuments().then(c => c);
    expect(count).to.equal(1);
  });

  it('can find and delete a task', async () => {
    const fetchedTask = await Task.findById(taskId).then(t => t);
    expect(fetchedTask).to.not.be.null;
    expect(fetchedTask?.task).to.equal(task.task);
    expect(fetchedTask?.comments).to.equal(task.comments);
    const deletedTask = await Task.findByIdAndDelete(fetchedTask?.id).then(
      d => d
    );
    expect(deletedTask).to.not.be.null;
    expect(deletedTask?.id).to.equal(fetchedTask?.id);
    expect(deletedTask?.task).to.equal(task.task);
    expect(deletedTask?.comments).to.equal(task.comments);
    const count = await Task.countDocuments().then(c => c);
    expect(count).to.equal(0);
  });
});
