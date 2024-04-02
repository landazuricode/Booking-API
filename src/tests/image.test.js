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

test('GET/ images should return all images', async () => {
    const res = await request(app).get('/images').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

//  test('POST/ images should return the created element', async () => {
//      const body = {
//          url: "url"
//      }
//      const res = await request(app).post('/images').send(body).set('Authorization', `Bearer ${token}`)
//      id = res.body.id
//      console.log(res.body)
//      expect(res.status).toBe(201);
//      expect(res.body.id).toBeDefined();
//      expect(res.body.url).toBe(body.url);
//  });


// test('DELETE/ images/:id will delete elements according to their id', async () => {
//     const res = await request(app).delete(`/images/${id}`).set('Authorization', `Bearer ${token}`)
//     expect(res.status).toBe(204);
// });
