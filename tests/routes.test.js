const request = require('supertest');
const app = require('../server');
const mongodb = require('../database/connect');

describe('GET Endpoints', () => {
  let dbConnection;

  beforeAll((done) => {
    mongodb.initDb((err, db) => {
      if (err) {
        return done(err);
      }
      dbConnection = db;
      done();
    });
  });

  afterAll((done) => {
    if (dbConnection) {
      dbConnection.close()
        .then(() => done())
        .catch((err) => done(err));
    } else {
      done();
    }
  });

  test('GET /users should return 200 and an array', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /projects should return 200 and an array', async () => {
    const response = await request(app).get('/projects');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /skills should return 200 and an array', async () => {
    const response = await request(app).get('/skills');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /experiences should return 200 and an array', async () => {
    const response = await request(app).get('/experiences');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /projects should return 401 when unauthorized', async () => {
    const response = await request(app).post('/projects').send({
      title: 'Test',
      description: 'Test description',
      technology: 'Node',
      projectUrl: 'http://test.com'
    });
    expect(response.status).toBe(401);
  });

  test('POST /skills should return 401 when unauthorized', async () => {
    const response = await request(app).post('/skills').send({
      name: 'JS',
      level: 'Expert',
      category: 'Frontend'
    });
    expect(response.status).toBe(401);
  });

  test('POST /users should return 400 when fields are missing (Validation)', async () => {
    const response = await request(app).post('/users').send({
      username: 'testuser'
      // missing firstName, lastName, email
    });
    expect(response.status).toBe(400);
  });
});
