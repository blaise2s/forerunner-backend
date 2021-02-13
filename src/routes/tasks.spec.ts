import * as request from 'supertest';
import { expect } from 'chai';

import { setup } from '../test/setup';
import { instance } from '../app';
import { prefixBase } from '../utils';
import { UserData, TaskData, TaskDocument } from '../models';

const app = instance();

const user: UserData = {
  email: 'test@test.com',
  password: 'passw0rd'
};

const task: TaskData = {
  task: 'Test Task',
  comments: 'With comments'
};

let token: string;
let taskId: string;

describe('/tasks', () => {
  setup();

  it('POST creates a new task with authenticated user', async () => {
    let res = await request(app)
      .post(prefixBase('/user/create'))
      .send(user)
      .then(r => r);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');

    res = await request(app)
      .post(prefixBase('/user/login'))
      .send(user)
      .then(r => r);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('expiresIn');
    expect(res.body.expiresIn).to.equal(3600);
    token = res.body.token;

    res = await request(app)
      .post(prefixBase('/tasks'))
      .set('Authorization', `Bearer ${token}`)
      .send(task)
      .then(r => r);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
    taskId = res.body._id;
  });

  it('POST prohibits creation of a new task with unauthenticated user', async () => {
    const res = await request(app)
      .post(prefixBase('/tasks'))
      .send(task)
      .then(r => r);
    expect(res.status).to.equal(401);
    expect(res.text).to.equal('Unauthorized');
  });

  it('GET returns all tasks for authenticated user', async () => {
    const res = await request(app)
      .get(prefixBase('/tasks'))
      .set('Authorization', `Bearer ${token}`)
      .then(r => r);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('tasks');
    expect(res.body).to.have.property('count');
    expect(res.body.count).to.equal(1);
    const fetchedTask: TaskDocument = res.body.tasks[0];
    expect(fetchedTask.task).to.equal(task.task);
    expect(fetchedTask.comments).to.equal(task.comments);
    expect(fetchedTask._id).to.equal(taskId);
  });

  it('GET prohibits fetching of tasks with unauthenticated user', async () => {
    const res = await request(app)
      .get(prefixBase('/tasks'))
      .send(task)
      .then(r => r);
    expect(res.status).to.equal(401);
    expect(res.text).to.equal('Unauthorized');
  });

  it('/:taskId GET returns specified task for authenticated user', async () => {
    const res = await request(app)
      .get(prefixBase(`/tasks/${taskId}`))
      .set('Authorization', `Bearer ${token}`)
      .then(r => r);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id');
    expect(res.body).to.have.property('task');
    expect(res.body).to.have.property('comments');
    const fetchedTask: TaskDocument = res.body;
    expect(fetchedTask.task).to.equal(task.task);
    expect(fetchedTask.comments).to.equal(task.comments);
    expect(fetchedTask._id).to.equal(taskId);
  });

  it('/:taskId GET prohibits fetching of a specified task with unauthenticated user', async () => {
    const res = await request(app)
      .get(prefixBase(`/tasks/${taskId}`))
      .send(task)
      .then(r => r);
    expect(res.status).to.equal(401);
    expect(res.text).to.equal('Unauthorized');
  });

  it('/:taskId DELETE deletes specified task for authenticated user', async () => {
    let res = await request(app)
      .delete(prefixBase(`/tasks/${taskId}`))
      .set('Authorization', `Bearer ${token}`)
      .then(r => r);
    expect(res.status).to.equal(200);

    res = await request(app)
      .get(prefixBase('/tasks'))
      .set('Authorization', `Bearer ${token}`)
      .then(r => r);
    expect(res.body.count).to.equal(0);
  });

  it('/:taskId DELETE prohibits deleting a specified task with unauthenticated user', async () => {
    const res = await request(app)
      .delete(prefixBase(`/tasks/${taskId}`))
      .send(task)
      .then(r => r);
    expect(res.status).to.equal(401);
    expect(res.text).to.equal('Unauthorized');
  });
});
