const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { User, Pool } = require('../../src/models');
const { userOne, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('Pool routes', () => {
  describe('POST /v1/pool/pair', () => {
    let newJoin;

    beforeEach(async () => {
      await insertUsers([userOne]);
      newJoin = { mode: 'mode1' };
    });

    test('should return 201 and successfully create new pool if data is ok', async () => {
      const res = await request(app)
        .post('/v1/pool/pair')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newJoin)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        userId: newJoin.userId,
        mode: newJoin.mode,
      });

      const dbUser = await User.findById(res.body.id);
      expect(dbUser).toBeDefined();
      expect(dbUser).toMatchObject({
        userId: newJoin.userId,
        mode: newJoin.mode,
      });
    });

    test('should return 401 error if access token is missing', async () => {
      await request(app).post('/v1/pool/pair').send(newJoin).expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 400 error if mode is invalid', async () => {
      newJoin.mode = 'invalidMode';

      await request(app)
        .post('/v1/pool/pair')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newJoin)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if already joined pool', async () => {
      await Pool.create({ userId: userOne._id, mode: newJoin.mode });

      await request(app)
        .post('/v1/pool/pair')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newJoin)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
