import UserModel from '../models/users';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
// sign up: create a new user
export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userInDb = await UserModel.findOne({ email: email });
  if (userInDb)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });
    const user = await newUser.save();
    res.status(201);
    res.send(user);
  } catch (error) {
    res.status(400);
    res.send({ error, message: 'Could not create user' });
  }
};

// getting the logged in user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .send('Bad request: Please provide email and password');
    }
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).send('No user found');
    }
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(401);
    res.send({ error: '401', message: 'Username or password is incorrect' });
  }
};

// getting user by id
export const userById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    res.send(user);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while getting the user. Please try again later.',
    });
  }
};

// edit user details
export const editUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, email, password, status, image, preferences } = req.body;
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          email: email,
          password: password,
          status: status,
          image: image,
          preferences: preferences,
        },
      },
      { new: true }
    );
    res.status(201);
    res.send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({
      message:
        'An unexpected error occurred while editing the user. Please try again later.',
    });
  }
};

export default { createUser, userById, editUser, login };
