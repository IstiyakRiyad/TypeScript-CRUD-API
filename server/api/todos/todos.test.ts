import supertest from "supertest";

import app from '../../app';

describe('GET /api/v1/todo', () => {
    it('Get all todos response with array of todos', async () => 
        supertest(app)
        .get('/api/v1/todo')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body).toHaveProperty('length');
            expect(response.body[0]).toHaveProperty('content');
            expect(response.body[0]).toHaveProperty('done');
        })
    );
});


let id = '';

describe('POST /api/v1/todo', () => {
    it('Post request return validation error', async () => 
        supertest(app)
        .post('/api/v1/todo')
        .set('Accept', 'application/json')
        .send({
            content: ''
        })
        .expect('Content-Type', /json/)
        .expect(422)
        .then(response => {
            // expect(response.body).toHaveProperty('message');
        })
    );
    

    it('Post request retun created data', async () => 
        supertest(app)
        .post('/api/v1/todo')
        .set('Accept', 'application/json')
        .send({
            content: 'One content',
            done: true
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(response => {
            id = response.body._id;
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('content');
        })
    );
});


describe('GET api/v1/todo/:id', () => {
    it('Response with valid id info',async () => 
        supertest(app)
        .get(`/api/v1/todo/${id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body).toHaveProperty('_id')
            expect(response.body).toHaveProperty('content')
            expect(response.body).toHaveProperty('done')
        }) 
    )   

    it('Response with invalid id property',async () => 
        supertest(app)
        .get(`/api/v1/todo/asdfklksdjflklskdf`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
    )   


    it('Response with invalid intity',async () => 
        supertest(app)
        .get(`/api/v1/todo/63105852cf09775789ed8f67`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(response => {
            expect(response.body).toHaveProperty('message')
        })
    )   
})




describe('Update api/v1/todo/:id', () => {
    it('Response with invalid id property',async () => 
        supertest(app)
        .put(`/api/v1/todo/asdfklksdjflklskdf`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(422)
    )   


    it('Response with invalid intity',async () => 
        supertest(app)
        .put(`/api/v1/todo/63105852cf09775789ed8f67`)
        .set('Accept', 'application/json')
        .send({
            content: 'hello',
            done: true
        })
        .expect('Content-Type', /json/)
        .expect(404)
        .then(response => {
            expect(response.body).toHaveProperty('message')
        })
    )   
    it('Response with valid id info',async () => 
        supertest(app)
        .put(`/api/v1/todo/${id}`)
        .set('Accept', 'application/json')
        .send({
            content: 'Hello World',
            done: true
        })
        .expect('Content-Type', /json/)
        .expect(200)
    )   

});




describe('Delete api/v1/todo/:id', () => {
    it('Response with invalid id property',async () => 
        supertest(app)
        .delete(`/api/v1/todo/asdfklksdjflklskdf`)
        .expect(422)
    )   


    it('Response with invalid intity',async () => 
        supertest(app)
        .delete(`/api/v1/todo/63105852cf09775789ed8f67`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(response => {
            expect(response.body).toHaveProperty('message')
        })
    )   
    it('Response with valid id info',async () => 
        supertest(app)
        .delete(`/api/v1/todo/${id}`)
        .expect(200)
    )   

});