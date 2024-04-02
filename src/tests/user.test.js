const request = require('supertest')
const app = require('../app')

let id;
let token;

test('POST/ users should return the created element', async () => {
    const body = {
        firstName: "David", 
        lastName: "Játiva", 
        email: "montero@gmail.com", 
        password: "montero1234", 
        gender: "MALE"
    }
    const res = await request(app).post('/users').send(body)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});

test('POST /users/login should perform login', async () => {
    const body = {
        email: "montero@gmail.com", 
        password: "montero1234"
    }
    const res = await request(app).post('/users/login').send(body)
    token = res.body.token
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(body.email);
});

test('GET/ users should return all users', async () => {
    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT/ users/:id should return the modified element by its id', async () => {
    const body = {
        firstName: "Updated David", 
    }
    const res = await request(app).put(`/users/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('POST /users/login with incorrect credentials should return an error', async () => {
    const body = {
        email: "incorrect@gmail.com", 
        password: "incorrect1234"
    }
    const res = await request(app).post('/users/login').send(body)
    expect(res.status).toBe(401);
});

test('DELETE/ users/:id will delete elements according to their id', async () => {
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});
