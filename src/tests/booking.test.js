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

test('GET/ bookings should return all bookings', async () => {
    const res = await request(app).get('/bookings').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ bookings should return the created element', async () => {
    const body = {
        checkIn: "2020-01-11",
        checkOut: "2020-03-11"
    }
    const res = await request(app).post('/bookings').send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.comment).toBe(body.comment);
});

test('PUT/ bookings/:id should return the modified element by its id', async () => {
    const body = {
        checkIn: "2020-06-01"
    }
    const res = await request(app).put(`/bookings/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
});

test('DELETE/ bookings/:id will delete elements according to their id', async () => {
    const res = await request(app).delete(`/bookings/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});
