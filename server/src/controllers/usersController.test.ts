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

describe('Integration test User Component', () => {
  const userData = {
    name: 'test1',
    email: 'test@example.com',
    password: 'password123',
  };
  beforeAll(async () => {
    await mongoose.disconnect();
    const url = `mongodb://localhost:27017/${databaseName}`;
    await mongoose.connect(url);
    await UserModel.deleteMany();
  });

  afterEach(async () => {
    await UserModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('create User', () => {
    it('should create a new user if the user does not exist', async () => {
      const res = await request.post('/user').send(userData);
      expect(res.statusCode).toBe(201);

      const user = await UserModel.findOne({ email: userData.email });

      expect(user?.email).toBe(userData.email);
    });

    it('should not create a user, if the user already exists', async () => {
      // Add logic to ensure user exists
      await UserModel.create(userData);

      const res = await request.post('/user').send(userData);
      expect(res.statusCode).toBe(409);
    });

    it('should throw an error if the password field is empty', async () => {
      const userData = {
        name: 'test',
        email: 'tes@example.com',
        password: '',
      };

      const res = await request.post('/user').send(userData);
      expect(res.statusCode).toBe(400);
    });
  });

  describe('user login', () => {
    // did not check the hashed password
    it('should login if email is provided and if it exists', async () => {
      const res = await request.post('/user/login').send(userData);
      const user = await UserModel.findOne({
        email: userData.email,
      });

      if (user) expect(res.statusCode).toBe(200);
    });

    it('should not login, if email or password is not provided', async () => {
      const userData2 = {
        name: 'test1',
        email: '',
        password: '',
      };
      const res = await request.post('/user/login').send(userData2);
      expect(res.statusCode).toBe(401);
    });
    it('should not login, if the user with the email does not exist', async () => {
      const userData3 = {
        name: 'test3',
        email: 'test3@example.com',
        password: 'password1234',
      };
      const res = await request.post('/user/login').send(userData3);
      expect(res.statusCode).toBe(400);
    });
  });

  describe('Get user by id', () => {
    beforeEach(async () => {
      // Insert test user into the database before each test
      await UserModel.create(userData);
    });
    it('should get the user by id', async () => {
      const user = await UserModel.findOne({ email: userData.email });
      const id = user?._id;

      const res = await request.get(`/user/${id}`);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('edit user', () => {
    it('should edit the user', async () => {
      const userDataUpdate = {
        name: 'testupdate',
        email: 'test@example.com',
        password: '1234',
        status: '',
        image: '',
        preferences: '',
      };
      const id = '65f2dc355d1130123ebdfc16';
      const res = await request.put(`/user/${id}`).send(userDataUpdate);
      expect(res.statusCode).toBe(201);
    });
  });
});
