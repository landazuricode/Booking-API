const request = require('supertest')
const app = require('../app')

let id;
let token;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: "test@gmail.com", 
        password: "test1234", 
    })
    token = res.body.token
})

test('GET/ reviews should return all reviews', async () => {
    const res = await request(app).get('/reviews').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});

test('POST/ reviews should return the created element', async () => {
    const body = {
        rating: 5,
        comment: "Hello, I am a test"
    }
    const res = await request(app).post('/reviews').send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.comment).toBe(body.comment);
});

test('PUT/ reviews/:id should return the modified element by its id', async () => {
    const body = {
        comment: "Hello, I am a test"
    }
    const res = await request(app).put(`/reviews/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.comment).toBe(body.comment);
});

test('DELETE/ reviews/:id will delete elements according to their id', async () => {
    const res = await request(app).delete(`/reviews/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});
