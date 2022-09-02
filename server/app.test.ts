import supertest from "supertest";
require('dotenv').config();
import app from './app';


describe('App', () => {
    it('GET /some-random-route', (done) => {
        supertest(app)
        .get('/some-random-route')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
});

describe('GET /', () => {
    it('Response with a json message', (done) => {
        supertest(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
            message: 'Hello World'
        }, done);
    });
});