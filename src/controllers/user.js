import jwt from 'jsonwebtoken';

import { User, hashPasswordWithSalt } from '../models/user';

export const loginRequired = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }

  next();
};

export const register = async (req, res) => {
  try {
    const { salt, hash } = hashPasswordWithSalt(req.body.password);
    const newUser = new User({ ...req.body, salt, hashPassword: hash });
    const savedUser = await newUser.save();

    savedUser.hashPassword = undefined;
    savedUser.salt = undefined;
    res.json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'User already exists!' });
    } else {
      res.status(400).send(error);
    }
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Authentication failed. No user found!' });
    }

    if (user.comparePassword(req.body.password)) {
      return res.json({
        token: jwt.sign(
          {
            email: user.email,
            username: user.username,
            _id: user.id,
          },
          'SecretWord',
        ),
      });
    }

    res.status(401).json({ message: 'Authentication failed. Wrong password!' });
  } catch (error) {
    res.status(400).send(error);
  }
};
