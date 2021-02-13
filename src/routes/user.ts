import { Router } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { User, UserData, UserDocument } from '../models';

export const userRoutes = Router();

userRoutes.post('/create', (req, res) => {
  const body: UserData = req.body;
  bcrypt.hash(body.password, 10).then(hash => {
    const newUser = new User({
      email: body.email,
      password: hash
    });
    newUser
      .save()
      .then(result => {
        res.status(201).json({
          _id: result.id
        });
      })
      .catch(error => {
        res.status(500).json({
          error: error.message
        });
      });
  });
});

userRoutes.post('/login', (req, res) => {
  const body: UserData = req.body;
  let fetchedUser: UserDocument;
  User.findOne({ email: body.email })
    .then(user => {
      if (user) {
        fetchedUser = user;
        return bcrypt.compare(body.password, user.password);
      }
      return null;
    })
    .then(result => {
      if (result) {
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser.id },
          process.env.SECRET_KEY!,
          { expiresIn: '1h' }
        );
        return res.status(200).json({
          token,
          expiresIn: 3600
        });
      }
      return res.sendStatus(401);
    })
    .catch(() => {
      return res.sendStatus(401);
    });
});
