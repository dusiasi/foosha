import express from 'express';
import router from '../router';
import mongoose from 'mongoose';
import supertest from 'supertest';

import UserModel from '../models/users';
const databaseName = 'test1';
const app = express();
app.use(express.json());
app.use(router);

// invokes supertest with our app
const request = supertest(app);

describe('Integration tests', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    const url = `mongodb://localhost:27017/${databaseName}`;
    await mongoose.connect(url);
  });

  afterEach(async () => {
    await UserModel.deleteMany();
    await mongoose.disconnect();
  });

  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
    };

    // Send a POST request to create a new user
    const response = await request.post('/user').send(userData).expect(201); // Expecting a 201 Created response

    // Check if the response contains the newly created user
    expect(response.body).toHaveProperty('email', userData.email);
    console.log(response.body);
    // expect(response.body).not.toHaveProperty('password'); // Ensure password is not returned
  });

  // it('should return 409 if user already exists', async () => {
  //   const existingUser = {
  //     email: 'existing@example.com',
  //     password: 'password123',
  //   };

  //   // Create an existing user in the database
  //   await UserModel.create(existingUser);

  //   // Try to create the same user again
  //   const response = await request.post('/user').send(existingUser).expect(409); // Expecting a 409 Conflict response

  //   // Check if the response contains the error message
  //   expect(response.body.error).toBe('409');
  //   expect(response.body.message).toBe('User already exists');
  // });

  // it('should return 400 if password is empty', async () => {
  //   const userData = {
  //     email: 'test@example.com',
  //     password: '', // Empty password
  //   };

  //   // Send a POST request with empty password
  //   const response = await request.post('/user').send(userData).expect(400); // Expecting a 400 Bad Request response

  //   // Check if the response contains the error message
  //   expect(response.body.error).toBeDefined();
  //   expect(response.body.message).toBe('Could not create user');
  // });
  // it('should save a user to the database', async () => {
  //   const email = 'elelele@yahoo';
  //   const res = await request
  //     .post('/user')
  //     .set('Accept', 'application/json')
  //     .send({ email: email });

  //   const user = await UserModel.findOne({ email: email });
  //   console.log(user);
  //   expect(user?.email).toBe(email);
  // });
});
