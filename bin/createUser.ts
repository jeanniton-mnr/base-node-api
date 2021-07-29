process.env.NODE_ENV = 'test';
// TODO: Create new role in DB

const app = require('./www');
const request = require('supertest')(app);


const adminUser = {
    "userName": "Moneriton",
    "email": "jeanniton.mnr@gmail.com",
    "password": "12345",
    "fullName": "Monero Jeanniton",
    "facebookId":"",
    "googleId": "",
    "role": ['admin']
};


request
    .post('/users')
    .set('Authorization', 'Bearer ' + `token`)
    .send({
        data: adminUser
    })
    .expect(200)
    .end((err, res) => {
        user = res.body.user;
        console.log(user);
    }).catch(error =>{
        console.log(error);
    });