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

test('GET/ cities should return all cities', async () => {
    const res = await request(app).get('/cities')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ cities should return the created element', async () => {
    const body = {
        name: 'Quito',
        country: 'Ecuador',
        countryId: 'ECU',
    }
    const res = await request(app).post('/cities').send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT/ cities/:id should return the modified element by its id', async () => {
    const body = {
        name: "Updated Quito", 
    }
    const res = await request(app).put(`/cities/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE/ cities/:id will delete elements according to their id', async () => {
    const res = await request(app).delete(`/cities/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});
