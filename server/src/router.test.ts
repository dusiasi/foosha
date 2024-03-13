import request from 'supertest';
import app from './index';
import supertest from 'supertest';

describe('User endpoint', () => {
  describe('get user route', () => {
    describe('is there a problem by getting the user', () => {
      it('should return a 500', async () => {
        const userId = '11';
        await supertest(app).get(`/user/${userId}`).expect(500);
      });
      it('should return a 200', async () => {
        const userId = '65ef346fcba11b95b1ce15eb';
        await supertest(app).get(`/user/${userId}`).expect(200);
      });
    });
  });
});
